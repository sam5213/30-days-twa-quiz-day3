const { Telegraf, Markup } = require('telegraf');


const bot = new Telegraf(process.env.BOT_TOKEN_DAY1);

const questions = [
  {
    question: "Какой язык программироавния используется для разработки телеграм-ботов?",
    options: ["JavaScript", "Python", "Java", "C#"],
    answer: "JavaScript"
  },
  {
    question: "Какой протокол используется для передачи данных в интернете?",
    options: ["FTP", "HTTP", "SMTP", "POP3"],
    answer: "HTTP"
  },
  {
    question: "Что такое HTML?",
    options: ["Язык разметки", "Язык программирования", "База данных", "Операционная система"],
    answer: "Язык разметки"
  }
]

let currentQuestionIndex = 0;
let correctAnswerCount = 0;

bot.start((ctx) => {
    currentQuestionIndex = 0;
    correctAnswerCount = 0;
    ctx.reply("Привет! Давай сыграем в квиз c нескольки вопросами. " + questions[currentQuestionIndex].question),
      Markup.inlineKeyboard(questions[currentQuestionIndex].options.map(option =>
        Markup.button.callback(option, option)
      ))
    );
});

bot.action(questions.flatMap(q => q.options), (ctx) => {
    const userAnswer = ctx.callbackQuery.data;

    if (userAnswer === questions[currentQuestionIndex].answer) {
        correctAnswerCount++
        ctx.reply("Правильно! Молодец!");
    } else {
        ctx.reply("Неправильно. Попробуй следующий вопрос!");
        
    }

    currentQuestionIndex++;
    console.log(`Текущий индекс вопроса: ${currentQuestionIndex}`);
  
    if (currentQuestionIndex < questions.length) {
        ctx.reply(questions[currentQuestionIndex].question),
          Markup.inlineKeyboard(questions[currentQuestionIndex].questions.map(option => 
            Markup.button.callback(option, option)
          ))
    } else {
        ctx.reply(`Квиз завершен! Вы ответили правильно на ${correctAnswerCount} вопросов из ${questions.length} вопросов.`);
        currentQuestionIndex = 0;
    }
});

bot.launch()
    .then(() => {
        console.log("Бот запущен!");
    })
    .catch((error) => {
        console.error("Ошибка при запуске бота: ", error);
    });
