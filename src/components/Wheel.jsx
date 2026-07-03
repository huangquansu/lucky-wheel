import react,{useState} from "react"
import "./App.css"

function Wheel() {
  const [prizeText, setPrizeText] = useState(
    "一獎\n二獎\n三獎\n安慰獎\n再接再厲\n小禮物"
  );

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [resultIndex, setResultIndex] = useState(null);

  // 把 textarea 的每一行轉成一個獎項
  const prizes = prizeText
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  const colors = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#bdb2ff",
    "#ffc6ff",
    "#a0c4ff",
  ];

  const anglePerPrize = prizes.length > 0 ? 360 / prizes.length : 0;

  const wheelBackground =
    prizes.length > 0
      ? `conic-gradient(${prizes
          .map((_, index) => {
            const startAngle = anglePerPrize * index;
            const endAngle = anglePerPrize * (index + 1);
            const color = colors[index % colors.length];

            return `${color} ${startAngle}deg ${endAngle}deg`;
          })
          .join(", ")})`
      : "#ddd";

  const spinWheel = () => {
    if (isSpinning) return;

    if (prizes.length < 2) {
      alert("請至少輸入 2 個獎項");
      return;
    }

    setIsSpinning(true);
    setResult("");
    setResultIndex(null);

    const randomIndex = Math.floor(Math.random() * prizes.length);

    const extraRounds = 5 * 360;

    const targetAngle =
      360 - randomIndex * anglePerPrize - anglePerPrize / 2;

    const newRotation = rotation + extraRounds + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setResult(prizes[randomIndex]);
      setResultIndex(randomIndex);
      setIsSpinning(false);
    }, 4000);
  };

  const removeResultFromList = () => {
    if (resultIndex === null) {
      alert("目前沒有抽中的獎項可以移除");
      return;
    }

    const newPrizes = prizes.filter((_, index) => index !== resultIndex);

    setPrizeText(newPrizes.join("\n"));
    setResult("");
    setResultIndex(null);
    
  };

  return (
    <div className="page">
      <h1>React 抽獎轉盤</h1>

      

      <div className="wheel-container">
        <div className="pointer"></div>

        <div
          className="wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
            background: wheelBackground,
          }}
        >
          {prizes.map((prize, index) => {
            const angle = anglePerPrize * index + anglePerPrize / 2;

            return (
              <div
                className="prize-text"
                key={`${prize}-${index}`}
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <span className="prize-label">{prize}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="button-group">
        <button onClick={spinWheel} disabled={isSpinning}>
          {isSpinning ? "轉動中..." : "開始抽獎"}
        </button>

        <button
          onClick={removeResultFromList}
          disabled={isSpinning || !result}
          className="remove-btn"
        >
          移除抽中項目
        </button>
      </div>
      {result && <h2>抽中：{result}</h2>}
      <div className="setting-box">
        <label>請輸入獎項，一行一個：</label>

        <textarea
          value={prizeText}
          onChange={(e) => {
            setPrizeText(e.target.value);
            setResult("");
            setResultIndex(null);
          }}
          disabled={isSpinning}
          rows={8}
          placeholder={"例如：\n一獎\n二獎\n三獎\n安慰獎"}
        />

        <p>目前獎項數量：{prizes.length}</p>
      </div>

      
    </div>


  );
}

export default Wheel