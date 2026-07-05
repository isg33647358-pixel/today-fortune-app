// HTML에서 필요한 요소를 찾아서 변수에 담습니다.
const birthDateInput = document.querySelector("#birthDate");
const birthTimeSelect = document.querySelector("#birthTime");
const unknownTimeInput = document.querySelector("#unknownTime");
const genderSelect = document.querySelector("#gender");
const fortuneButton = document.querySelector("#fortuneButton");
const message = document.querySelector("#message");
const resultPanel = document.querySelector("#result");
const resultTitle = document.querySelector("#resultTitle");
const fortuneList = document.querySelector("#fortuneList");

// 운세 문장을 종류별로 모아 둔 데이터입니다.
// 실제 사주 계산이 아니라, 아래 문장 중 하나를 규칙에 따라 골라 보여줍니다.
const fortunes = {
  overall: [
    "올해는 주변 사람들과의 관계가 부드럽게 풀리며 새로운 기회가 찾아오는 흐름입니다.",
    "차분히 준비한 일이 빛을 보기 좋은 해입니다. 서두르기보다 꾸준함이 행운을 부릅니다.",
    "변화의 기운이 강한 해입니다. 낯선 선택도 천천히 살피면 좋은 방향으로 이어집니다.",
    "작은 성취가 쌓이며 자신감이 커지는 해입니다. 일상의 리듬을 지키는 것이 중요합니다."
  ],
  money: [
    "큰 모험보다 안정적인 관리가 재물운을 키웁니다. 지출 기록을 남기면 도움이 됩니다.",
    "새로운 수입 아이디어가 떠오르기 쉬운 해입니다. 다만 충동구매는 조심하세요.",
    "필요한 곳에 돈을 쓰면 나중에 더 큰 만족으로 돌아옵니다. 배움과 건강에 투자해 보세요.",
    "금전 흐름은 천천히 좋아집니다. 작게 저축하는 습관이 올해의 든든한 부적입니다."
  ],
  love: [
    "솔직한 대화가 연애운을 밝게 합니다. 마음을 숨기기보다 부드럽게 표현해 보세요.",
    "새로운 인연보다 익숙한 사람과의 관계에서 따뜻한 변화가 생길 수 있습니다.",
    "상대의 속도를 존중하면 관계가 더 깊어집니다. 기다림이 좋은 답을 가져옵니다.",
    "혼자만의 시간을 잘 보내는 사람이 더 매력적으로 보이는 해입니다."
  ],
  health: [
    "몸의 신호를 빨리 알아차리는 것이 중요합니다. 수면과 물 마시기를 먼저 챙기세요.",
    "가벼운 산책이나 스트레칭처럼 오래 할 수 있는 습관이 건강운을 올립니다.",
    "무리하면 쉽게 지칠 수 있으니 휴식 일정을 미리 잡아두는 것이 좋습니다.",
    "따뜻한 음식과 규칙적인 생활이 몸과 마음의 균형을 잡아줍니다."
  ],
  work: [
    "협업에서 좋은 결과가 나옵니다. 혼자 해결하려 하기보다 의견을 나누면 길이 보입니다.",
    "새로운 기술이나 업무 방식을 배우기 좋은 해입니다. 배움이 곧 기회가 됩니다.",
    "책임이 늘 수 있지만 그만큼 인정받을 가능성도 큽니다. 기록과 정리가 힘이 됩니다.",
    "속도보다 완성도가 중요한 해입니다. 꼼꼼함이 일과 사업의 운을 단단하게 만듭니다."
  ],
  colors: ["살구빛", "깊은 보라", "따뜻한 금색", "연두색", "크림 화이트", "코랄 핑크"],
  advice: [
    "올해는 마음이 급할수록 한 박자 쉬어가세요. 좋은 운은 여유를 좋아합니다.",
    "작은 약속을 지키는 힘이 큰 신뢰로 돌아옵니다.",
    "새로운 시작을 두려워하지 마세요. 단, 준비한 만큼 더 멀리 갑니다.",
    "나를 소진시키는 일보다 나를 살리는 선택을 먼저 생각하세요.",
    "비교를 줄이고 어제의 나보다 조금 나아지는 데 집중하면 운이 열립니다."
  ],
  monthly: [
    "차분히 계획을 세우면 한 해의 방향이 또렷해집니다.",
    "사람들과의 대화에서 뜻밖의 힌트를 얻게 됩니다.",
    "미뤄 둔 일을 정리하기 좋고, 작은 성취가 자신감을 줍니다.",
    "새로운 제안이나 만남이 들어올 수 있으니 열린 마음을 가져보세요.",
    "금전과 일정 관리가 중요하며, 무리한 약속은 줄이는 편이 좋습니다.",
    "마음이 가벼워지고 관계운이 따뜻하게 살아나는 시기입니다.",
    "휴식과 재충전이 필요합니다. 몸의 리듬을 먼저 챙겨보세요.",
    "배움과 성장의 운이 강합니다. 새 기술이나 습관을 시작하기 좋습니다.",
    "일과 사업에서 인정받을 기회가 있으니 준비한 것을 보여주세요.",
    "중요한 선택은 서두르지 말고 주변 조언을 함께 살펴보세요.",
    "재물운이 안정되는 흐름입니다. 작게 모으는 힘이 커집니다.",
    "한 해를 정리하며 고마운 사람에게 마음을 전하면 좋은 운이 이어집니다."
  ]
};

// 양력/음력 선택값을 숫자로 바꾸기 위한 표입니다.
const calendarScores = {
  solar: 0,
  lunar: 17
};

// 성별 선택값을 숫자로 바꾸기 위한 표입니다.
const genderScores = {
  none: 0,
  male: 4,
  female: 8
};

// 현재 선택된 양력/음력 값을 가져옵니다.
function getCalendarType() {
  const checkedInput = document.querySelector("input[name='calendarType']:checked");
  return checkedInput.value;
}

// 출생시간을 숫자로 바꿉니다.
function getBirthTimeScore(birthTime, isUnknownTime) {
  // 모름을 선택했다면 시간 점수는 0으로 처리합니다.
  if (isUnknownTime) {
    return 0;
  }

  // "14:30" 같은 시간을 시와 분으로 나눕니다.
  const timeParts = birthTime.split(":");
  const hour = Number(timeParts[0]);
  const minute = Number(timeParts[1]);

  // 시와 분을 함께 반영해서 같은 생년월일이라도 시간에 따라 결과가 달라지게 합니다.
  return hour * 5 + minute;
}

// 같은 입력값이면 항상 같은 숫자가 나오도록 기준 숫자를 만듭니다.
function makeSeed(birthDate, calendarType, birthTime, isUnknownTime, gender) {
  const dateNumber = Number(birthDate.replaceAll("-", ""));
  const birthTimeScore = getBirthTimeScore(birthTime, isUnknownTime);

  return dateNumber + calendarScores[calendarType] + birthTimeScore + genderScores[gender];
}

// 배열 안에서 하나의 문장을 고르는 함수입니다.
function pickItem(list, seed, extraNumber) {
  const index = (seed + extraNumber) % list.length;
  return list[index];
}

// 1월부터 12월까지의 월별 운세 데이터를 만듭니다.
function makeMonthlyFortune(seed) {
  const monthlyItems = [];

  for (let monthNumber = 1; monthNumber <= 12; monthNumber += 1) {
    const text = pickItem(fortunes.monthly, seed, monthNumber * 11);

    monthlyItems.push({
      month: `${monthNumber}월`,
      text: text
    });
  }

  return monthlyItems;
}

// 전체운, 재물운 같은 기본 운세 카드를 만드는 함수입니다.
function createFortuneCard(title, text) {
  const card = document.createElement("article");
  card.className = "fortune-card";

  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");

  heading.textContent = title;
  paragraph.textContent = text;

  card.appendChild(heading);
  card.appendChild(paragraph);

  return card;
}

// 2026년 월별 운세를 12개의 작은 카드로 만드는 함수입니다.
function createMonthlySection(monthlyItems) {
  const section = document.createElement("section");
  section.className = "monthly-section";

  const heading = document.createElement("h3");
  heading.textContent = "2026년 월별 운세";

  const grid = document.createElement("div");
  grid.className = "monthly-grid";

  monthlyItems.forEach(function (item) {
    const monthCard = document.createElement("article");
    monthCard.className = "month-card";

    const monthTitle = document.createElement("h4");
    const monthText = document.createElement("p");

    monthTitle.textContent = item.month;
    monthText.textContent = item.text;

    monthCard.appendChild(monthTitle);
    monthCard.appendChild(monthText);
    grid.appendChild(monthCard);
  });

  section.appendChild(heading);
  section.appendChild(grid);

  return section;
}

// 결과 제목에서 양력/음력을 사람이 읽기 쉬운 글자로 바꿉니다.
function getCalendarLabel(calendarType) {
  if (calendarType === "lunar") {
    return "음력";
  }

  return "양력";
}

// 출생시간 모름을 체크하면 시간 입력칸을 잠급니다.
function updateBirthTimeState() {
  birthTimeSelect.disabled = unknownTimeInput.checked;
}

// "올해 운세 보기" 버튼을 눌렀을 때 실행됩니다.
function showFortune() {
  const calendarType = getCalendarType();
  const birthDate = birthDateInput.value;
  const birthTime = birthTimeSelect.value;
  const isUnknownTime = unknownTimeInput.checked;
  const gender = genderSelect.value;

  if (!birthDate) {
    message.textContent = "생년월일을 먼저 입력해 주세요.";
    resultPanel.classList.add("hidden");
    return;
  }

  message.textContent = "";

  const seed = makeSeed(birthDate, calendarType, birthTime, isUnknownTime, gender);
  const luckyNumber = (seed % 99) + 1;

  const resultItems = [
    ["전체운", pickItem(fortunes.overall, seed, 1)],
    ["재물운", pickItem(fortunes.money, seed, 2)],
    ["연애운", pickItem(fortunes.love, seed, 3)],
    ["건강운", pickItem(fortunes.health, seed, 4)],
    ["일/사업운", pickItem(fortunes.work, seed, 5)],
    ["행운의 색", pickItem(fortunes.colors, seed, 6)],
    ["행운의 숫자", String(luckyNumber)],
    ["올해의 조언", pickItem(fortunes.advice, seed, 7)]
  ];

  fortuneList.innerHTML = "";
  resultTitle.textContent = `${getCalendarLabel(calendarType)} ${birthDate}의 해운세`;

  resultItems.forEach(function (item) {
    const title = item[0];
    const text = item[1];
    const fortuneCard = createFortuneCard(title, text);
    fortuneList.appendChild(fortuneCard);
  });

  const monthlyItems = makeMonthlyFortune(seed);
  const monthlySection = createMonthlySection(monthlyItems);
  fortuneList.appendChild(monthlySection);

  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 모름 체크박스가 바뀔 때마다 시간 입력칸 상태를 바꿉니다.
unknownTimeInput.addEventListener("change", updateBirthTimeState);

// 처음 화면을 열었을 때도 체크 상태에 맞게 시간 입력칸을 정리합니다.
updateBirthTimeState();

// 버튼을 클릭하면 showFortune 함수가 실행되도록 연결합니다.
fortuneButton.addEventListener("click", showFortune);
