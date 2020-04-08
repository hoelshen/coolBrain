const automator = require('miniprogram-automator')
// const pro = require('prcess.env')
automator.launch({
  projectPath: `${process.env.PWD}`, // 项目文件地址
}).then(async miniProgram => {
  console.log('miniProgram: ', miniProgram);
  const page = await miniProgram.reLaunch('/pages/index/index')
  console.log('page: ', page);
  await page.waitFor(500)
  const element = await page.$('.home')
  console.log(await element.attribute('class'))
  await element.tap()
  await page.waitFor(500)

  await miniProgram.close()
})