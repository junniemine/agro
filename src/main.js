
let totalSteps = 10;       
let currentStep = 0;       
let clickCount = 0;        

const stepTexts = [
  "어젯밤, 썸남이 갑자기 새벽 2시에 메시지를 하나 보냈다.",
  "평소 그 아이가 보내던 말투가 아니었다.",
  "짧은 이모티콘 하나, 그리고 ‘왔어?’라는 말.",
  "문제는… 나는 그 시간에 자고 있었고, 연락한 적도 없었다.",
  "댓글에서는 모두 ‘전 애인 아니냐’, ‘기억 안 나는 대화?’라며 난리가 났다.",
  "하지만 진짜 반전은 따로 있었다. 그 메시지는… 나에게 온 게 아니었다.",
  "그 번호는 저장조차 되어 있지 않았다.",
  "심지어 통신사 오류도 아니었다.",
  "다음날, 그 아이에게 물어보니 그는 그런 메시지를 보낸 적이 없다고 했다.",
  "결국… 그 메시지는 ‘전 주인’의 iCloud 동기화 오류였다."
];

function handleClick() {
  clickCount++;
  document.getElementById("count").innerText = clickCount % 10;

  if (clickCount === 10) {
    document.getElementById("click-area").style.display = "none";
    document.getElementById("article").style.display = "block";

    const container = document.getElementById("linesContainer");
    const p = document.createElement("p");
    p.innerText = stepTexts[0];
    container.appendChild(p);

    currentStep = 1;
    clickCount = 0; // 다음 단계 클릭 횟수 초기화
    document.getElementById("stepClick").innerText = 0;
  }
}

function nextClick() {
  clickCount++;
  document.getElementById("stepClick").innerText = clickCount % 10;

  // 10번 누르면 다음 줄 등장
  if (clickCount % 10 === 0) {
    const container = document.getElementById("linesContainer");

    if (currentStep < totalSteps) {
      const p = document.createElement("p");
      p.innerText = stepTexts[currentStep];
      container.appendChild(p);
      currentStep++;
    }

    // === 모든 줄(10줄) 다 읽으면 ===
    if (currentStep === totalSteps) {
      document.getElementById("nextBtn").style.display = "none";

      // 클릭 횟수 표시 숨기기
      document.getElementById("stepClick").parentElement.style.display = "none";

      // 말풍선 표시
      const bubble = document.getElementById("share-bubble");
      bubble.style.display = "block";
    }

    clickCount = 0;
    document.getElementById("stepClick").innerText = 0;
  }
}

function enableLongPress(button, callback) {
  let pressTimer;

  button.addEventListener("touchstart", () => {
    pressTimer = setTimeout(() => {
      callback();      // 0.4초 이상 누르면 클릭처럼 실행
    }, 400);
  });

  button.addEventListener("touchend", () => {
    clearTimeout(pressTimer);
  });

  button.addEventListener("touchmove", () => {
    clearTimeout(pressTimer);
  });
}

// 클릭 10번 버튼
enableLongPress(document.querySelector(".click-btn"), handleClick);

// 다음 내용 보기 버튼
const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
  enableLongPress(nextBtn, nextClick);
}
