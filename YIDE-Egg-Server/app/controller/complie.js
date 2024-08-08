const babel = require('@babel/core');
const postcss = require('postcss');
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');

// const path = require('path');
// const fs = require('fs');
const { parseDocument } = require('htmlparser2');
const cheerio = require('cheerio');
const BaseController = require('./base');

// 解析Html，取出所有script中包含的内容，取出所有style中的内容，取出body中的内容，如果没有body则取所有html脚本的内容，去掉script，style，meta，link，header等标签及其内容，只保留最基本的html结构内容
/**
 * 解析HTML并提取内容
 * @param {string} html - 需要解析的HTML字符串
 * @returns {object} - 包含提取内容的对象
 */
const parseHtml = html => {
  const document = parseDocument(html);

  const $ = cheerio.load(document);
  // 提取所有 <script> 中的内容
  const scripts = $('script')
    .map((_, script) => $(script).html())
    .get();

  // 提取所有外部 <script> 的 URL
  const externalScripts = $('script[src]')
    .map((_, script) => $(script).attr('src'))
    .get();

  // 提取所有 <style> 中的内容
  const styles = $('style')
    .map((_, style) => $(style).html())
    .get();

  // 提取所有外部 CSS <link> 的 URL
  const externalStyles = $('link[rel="stylesheet"]')
    .map((_, link) => $(link).attr('href'))
    .get();
  // 提取 <body> 中的内容，如果没有 <body> 则取所有HTML内容
  const bodyContent = $('body').html();

  // 去掉 <script>, <style>, <meta>, <link>, <header> 等标签及其内容
  $('script').remove();
  $('style').remove();
  $('meta').remove();
  $('link').remove();
  $('head').remove();

  // 如果body标签存在，则只保留body内容，否则保留所有html内容
  let cleanHtml = '';
  if ($('body').length) {
    cleanHtml = $('body').html();
  } else if ($('html').length) {
    cleanHtml = $('html').html();
  } else {
    cleanHtml = $.html();
  }

  return {
    scripts,
    externalScripts,
    styles,
    externalStyles,
    bodyContent,
    cleanHtml
  };
};

const mergeContent = contentArray => {
  return contentArray.join('\n');
};

const isValidPath = str => {
  // 检查字符串是否以斜杠开头且只有一个斜杠
  // 检查字符串是否以斜杠开头且只有一个斜杠
  const match = str.match(/^\/([^/]+)$/);
  if (match) {
    return match[1]; // 返回斜杠后的字符
  }
  return ''; // 不符合要求返回空字符串
};
class CompileController extends BaseController {
  async complileHtml() {
    const { ctx } = this;
    const { compileFileName } = ctx.request.body;
    const userInfo = ctx.state.userinfo;

    try {
      if (compileFileName && compileFileName.endsWith('.html')) {
        const htmlContentResult = await ctx.service.file.getFileWithContent(compileFileName, userInfo.id);

        const parseResult = parseHtml(htmlContentResult.content);

        let html = parseResult.bodyContent ? parseResult.bodyContent : parseResult.cleanHtml;
        const hasNoStyleCss = html.includes('// no style.css');
        const hasNoScriptCss = html.includes('// no script.js');

        // 去除注释
        // html = html.replace(/\/\/ no style\.css[\s\S]*?\/\/\s*<\/style>/g, '');
        // html = html.replace(/\/\/ no script\.js[\s\S]*?<\/script>/g, '');
        html = html.replace(/\/\/\s+no\s+style\.css\s*|\/\/\s+no\s+script\.js\s*/g, '');
        // 处理 externalScripts
        const hasScriptDefaultJs = parseResult.externalScripts?.some(item => item.includes('script.js')) || false;
        if (!hasScriptDefaultJs && !hasNoScriptCss) {
          parseResult.externalScripts.push('/script.js');
        }
        const scriptPromises =
          parseResult.externalScripts?.map(async item => {
            const fileName = isValidPath(item);
            if (fileName) {
              const fileContentResult = await ctx.service.file.getFileWithContent(fileName, userInfo.id);
              if (fileContentResult) {
                parseResult.scripts.push(fileContentResult.content);
              }
            }
          }) || [];

        // 处理 externalStyles

        const hasStyleDefaultCss = parseResult.externalStyles?.some(item => item.includes('style.css')) || false;
        if (!hasStyleDefaultCss && !hasNoStyleCss) {
          parseResult.externalStyles.push('/style.css');
        }
        const stylePromises =
          parseResult.externalStyles?.map(async item => {
            const fileName = isValidPath(item);
            if (fileName) {
              const fileContentResult = await ctx.service.file.getFileWithContent(fileName, userInfo.id);
              if (fileContentResult) {
                parseResult.styles.push(fileContentResult.content);
              }
            }
          }) || [];

        // 等待所有异步操作完成
        await Promise.all([...scriptPromises, ...stylePromises]);

        const css = mergeContent(parseResult.styles ? parseResult.styles : '');
        const js = mergeContent(parseResult.scripts ? parseResult.scripts : '');

        const processedCss = await postcss([postcssImport, cssnext]).process(css, { from: undefined });

        const processedJs = babel.transform(js, { presets: ['@babel/preset-env'] }).code;

        const output = `
          <html>
          <head>
            <style>${processedCss.css}</style>
          </head>
          <body>
            ${html}
            <script>${processedJs}</script>
          </body>
          </html>
        `;
        this.success(output, 'success');
      }
    } catch (error) {
      let msg = '';
      const errorMessage = error.message || error.toString();
      if (errorMessage.includes('css')) {
        msg = 'Check your CSS code!';
      } else if (
        errorMessage.includes('js') ||
        errorMessage.includes('javascript') ||
        error.code === 'BABEL_PARSE_ERROR'
      ) {
        msg = 'Check your JS code!';
      } else {
        msg = 'Check your code!';
      }

      this.fail(201, msg);
    }

    // const dirPath = `app/public/user/${userInfo.username}`;
    // const filePath = path.join(this.config.baseDir, dirPath, compileFileName);

    // const htmlContent = fs.readFileSync(filePath, 'utf-8');
    // const parseResult = parseHtml(htmlContent);
  }
}

module.exports = CompileController;
