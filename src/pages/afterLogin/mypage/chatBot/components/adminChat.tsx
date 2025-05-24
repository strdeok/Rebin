export default function AdminChat({ question }: { question: string | null }) {
  const getAnswer = () => {
    switch (question) {
      case "pill":
        return (
          <>
            <b>수거 장소</b> <br />
            가까운 약국, 보건소, 보건진료소의 폐의약품 수거함을 이용해주세요!
            <br />
            <br />
            <b>포장재 분리 방법 종이</b>
            <br />
            <li>
              포장재 (설명서, 종이곽, 약국 봉투): 종이류 또는 일반 쓰레기로!
            </li>
            <li>
              약 봉지, 플라스틱 포장재, 연고 튜브, 물약/안약/영양제 통: 그대로
              수거함에 버리기!
            </li>
          </>
        );

      case "bottle":
        return (
          <>
            <b>분리배출 요령</b> <br />
            <ol>
              <li>1. 내용물을 비우고 물로 깨끗이 씻기!</li>
              <li>2. 병뚜껑은 캔류(철) 로 분리배출해주세요!</li>
              <li>3. 보증금 마크가 있는 병은 보증금 환불 가능합니다!</li>
            </ol>
            ⚠️ 주의사항 <br />
            <li>병 안 이물질 제거 필수!!</li>
            <li>
              깨지거나, 보증금 마크 없는 병은 일반 종량제가 아닌 불연성 종량제
              봉투에 배출해주세요!
            </li>
          </>
        );

      case "battery":
        return <>폐건전지 수거함(동주민센터, 학교, 마트 등)을 이용해주세요!</>;

      case "rest":
        return <>기타 품목은 아직 준비중입니다!</>;

      case null:
        return (
          <>
            안녕하세요, <br />
            리비니입니다! <br />
            <br />
            궁금하신 사항은 <br />
            저에게 물어봐주세요!
          </>
        );
    }
  };

  return (
    <div className="px-4 pt-8">
      <div className="flex flex-row items-center text-xl font-semibold gap-3">
        <div id="icon" className="rounded-full size-10">
          <img src="/images/character.png" />
        </div>
        Channel
      </div>

      <div className="w-56 h-auto px-4 py-3 bg-[#F3F3F3] rounded-lg mt-4 text-xl">
        {getAnswer()}
      </div>
    </div>
  );
}
