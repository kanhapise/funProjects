const FAQQuestion = [
  {
    id: 1,
    question: `What is a Lorem?`,
    answer: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit officia, tempora magni tenetur in expedita, quaerat accusamus laborum commodi perferendis, rerum facilis obcaecati neque doloremque eum fugit alias similique dolorum. `,
  },
  {
    id: 2,
    question: `What is a Lorem?`,
    answer: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit officia, tempora magni tenetur in expedita, quaerat accusamus laborum commodi perferendis, rerum facilis obcaecati neque doloremque eum fugit alias similique dolorum. `,
  },
  {
    id: 3,
    question: `What is a Lorem?`,
    answer: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit officia, tempora magni tenetur in expedita, quaerat accusamus laborum commodi perferendis, rerum facilis obcaecati neque doloremque eum fugit alias similique dolorum. `,
  },
  {
    id: 4,
    question: `What is a Lorem?`,
    answer: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit officia, tempora magni tenetur in expedita, quaerat accusamus laborum commodi perferendis, rerum facilis obcaecati neque doloremque eum fugit alias similique dolorum. `,
  },
  {
    id: 5,
    question: `What is a Lorem?`,
    answer: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit officia, tempora magni tenetur in expedita, quaerat accusamus laborum commodi perferendis, rerum facilis obcaecati neque doloremque eum fugit alias similique dolorum. `,
  },
];

const faqContEl = document.getElementById("faqCont");

function createFAQEl(data) {
  const faqEl = document.createElement("div");
  faqEl.classList.add("faq");

  // Question Cont

  const questionCont = document.createElement("div");
  questionCont.classList.add("questionCont");

  faqEl.appendChild(questionCont);

  const questionEl = document.createElement("div");
  questionEl.classList.add("question");
  const questionPara = document.createElement("p");
  questionPara.innerHTML = data.question;
  questionEl.appendChild(questionPara);

  // icon

  const iconEl = document.createElement("div");
  iconEl.classList.add("icon");
  const iconBtn = document.createElement("button");
  iconBtn.innerHTML = `<ion-icon name="chevron-down"></ion-icon>`;
  iconEl.appendChild(iconBtn);

  questionCont.appendChild(questionEl);
  questionCont.appendChild(iconEl);
  
}