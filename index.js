const { Telegraf } = require('telegraf')
const config = require('config')
const bot = new Telegraf(config.get('BOT_TOKEN'))

bot.use(async (ctx, next) => {
    
    console.time(`Processing update ${ctx.update.update_id}`)
    await next()// runs after next middleware finishes
    console.timeEnd(`Processing update ${ctx.update.update_id}`)
  })

bot.start(ctx => {
    console.log(ctx.update.message.entities)
    console.log(ctx.update.message.from)
    const sender = ctx.update.message.from
    ctx.replyWithMarkdown(`Assalomu alaykum [${sender.first_name}](tg://user?id=${sender.id}) Bizning botga xush kelibsiz!!! \n Sizning Id:${sender.id}`, {

    })
})
// bot.on('message', (ctx) => {
//     console.log(ctx)
//     ctx.reply('exit')
// })

bot.on('new_chat_members',async ctx => {
    await ctx.replyWithChatAction('typing')
    const members = ctx.update.message.new_chat_members
    console.log(ctx.chatMember)
    // await ctx.deleteMessage(ctx.ctx.message.message_id)
    let memberList = ""
    members.map((x, key) => {
        const { first_name, id } = x
        memberList += `[${first_name}](tg://user?id=${id}) `
    })
    
    await ctx.replyWithMarkdown(`
        Assalomu alaykum ${memberList}. Guruhimizga xush kelibsiz${members.length > 1 ? "lar": ""}😊!!!\mn
        Welcome to our group, ${memberList}! I'm glad to see you😊
    `)
})


// bot.command('/ban',async ctx => {
//     // console.log(ctx.update.message.reply_to_message)
//     const messageId = ctx.update.message.message_id

//     const options =  {
//         reply_to_message_id:messageId
//     }
//     if(!ctx.update.message.reply_to_message)
//        return await ctx.replyWithMarkdown(`Reply one of message for ban user`, options )
    
//     const chatId = ctx.update.message.reply_to_message.chat.id
//     const firstName = ctx.update.message.reply_to_message.from.first_name
//     const userId = ctx.update.message.reply_to_message.from.id
//     console.log(userId)
//     const resrictMember = await ctx.kickChatMember(-1001588927759,1187959170)

    
    
//     // if(!resrictMember)
//     //     await ctx.replyWithMarkdown(`You can\'t ban [${firstName}](tg://user?id=${userId})`,options )
//     // await ctx.replyWithMarkdown(`You banned [${firstName}](tg://user?id=${userId})`,options)
// })




bot.start(ctx => {
    ctx.reply('Safe botga xush kelibsiz. Bu bot orqali siz guruhlarni oson boshqarishingiz mumkin.')
})
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))