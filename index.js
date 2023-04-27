const TelegamApi = require('node-telegram-bot-api');
const token = '6062892461:AAGyEMt4upKgHEczEIt1t2A_uYTIzwO38uY';
const {gameOptions, againOptions} = require('/.options');
const bot = new TelegamApi(token, options= {polling: true});
const chats = {};


bot.setMyCommands(commands = [
    {command: '/start', description: 'Начальство приветсвие'},
    {command: '/info', description: 'Информация о пользователе'},
    {command: '/game', description: 'Игра угадай цифру'},
])

const startGame = async(chatId) => {
    await bot.sendMessage(chatId, text = `Я загадываю цифру от 0 до 9, а ты должен ее отгадать!`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, text = `Отгадывай`,  gameOptions)
}
const start = () => {
    bot.on(event ='message', listener = async msg =>  {
        let text = msg.text;
        const chatId = msg.chat.id;
        if ( text === '/start'){
            await bot.sendSticker(chatId, sticker = 'https://tlgrm.eu/_/stickers/7e8/aa6/7e8aa67b-ad91-4d61-8f62-301bde115989/192/1.webp')
            return bot.sendMessage(chatId, text = `Добро пожаловать в бот компании РИМ`)
        }
        if ( text === '/info'){
            return bot.sendMessage(chatId, text = `Тебя зовут ${msg.from.first_name}`)
        }
        if ( text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, text = `Я тебя не понимаю, попробуй еще раз!)`)
    })    

    bot.on(event = 'callback_query', listener = async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if ( data === '/again')
        {
            return startGame(chatId)
        }
        if( data === chats[chatId]){
            return bot.sendMessage(chatId, text = `Молодец, ты угадал(а) ${data}!`, againOptions);
        } else{
            return bot.sendMessage(chatId, text = `К сожелению ты не угадал(а), бот загадал ${chats[chatId]}.Попробуй еще раз)!`, againOptions);
        }
    })
}
start()