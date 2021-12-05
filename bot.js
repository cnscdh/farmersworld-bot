//农民世界机器人V1.3
(async () => {
  // 可选择要执行的的地图
  // 1 — 矿业
  // 2 — 鸡舍
  // 3 — 种地
  // 4 — 牛舍
  // 例如：const availableMaps = [1];表示执行矿业
  const availableMaps = [1, 2, 3, 4];
  // 移动到下一个地图之间的延迟（5秒）
  const delayNextMap = 5 * 1000;
  // 地图选择后的延迟（5秒）
  const delayAfterMapSelect = 5 * 1000;
  // 找到后的延迟（1秒）
  const delayAfterMine = 1 * 1000;
  // 维修开始前的延迟（10秒）
  const delayBeforeRepair = 10 * 1000;
  // 维修开始后延迟（1秒）
  const delayAfterRepair = 1 * 1000;

  const mapBtn = document.querySelector(".navbar-group--icon[alt='Map']");
  mapBtn.click();

  while (1) {
    for (let mapId = 0; mapId < 4; ++mapId) {
      if (!availableMaps.includes(mapId + 1)) continue;

      await new Promise((res) => setTimeout(res, delayNextMap));

      const map = document.querySelectorAll(".map-container-bg")[mapId];

      if (map.style.filter === "grayscale(1)") continue;

      map.click();

      await new Promise((res) => setTimeout(res, delayAfterMapSelect));

      for (const [indexItem, item] of document
        .querySelectorAll(".vertical-carousel-container img")
        .entries()) {
        item.click();

        await new Promise((res) => setTimeout(res, 1e3));

        const buttonMine = document.querySelector(
          ".info-section .plain-button"
        );
        const timeToEnd = document.querySelector(
          ".info-section .info-time"
        ).innerText;
        if (
          ![...buttonMine.classList].includes("disabled") &&
          timeToEnd === "00:00:00"
        ) {
          buttonMine.click();

          await new Promise((res) => setTimeout(res, delayAfterMine));

          // 选择地图并检查
          if (mapId === 0) {
            await new Promise((res) => setTimeout(res, delayBeforeRepair));

            // 维修工具
            const buttonRepair = document.querySelectorAll(
              ".info-section .plain-button"
            )[1];
            const quality = eval(
              document.querySelector(".card-number").innerText
            );
            if (
              ![...buttonRepair.classList].includes("disabled") &&
              quality < 0.5
            ) {
              buttonRepair.click();
              await new Promise((res) => setTimeout(res, delayAfterRepair));
            }
          }
            // 补充能量（小于200能量添加100能量）可调整数值
          const currentEnergy = +document.querySelectorAll(
            ".resource-number div"
          )[3].innerText;
          const currentFish =
            +document.querySelectorAll(".resource-number")[2].innerText;
          if (currentEnergy < 200 && currentFish > 20) {
            document.querySelector(".resource-energy img").click();
            await new Promise((res) => setTimeout(res, 1e3));

            for (let i = 0; i++ < 20; ) {
              document.querySelector(".image-button[alt='Plus Icon']").click();
              await new Promise((res) => setTimeout(res, 5e2));
            }

            document.querySelector(".modal-wrapper .plain-button").click();

            await new Promise((res) => setTimeout(res, 2e4));
          }
        }
      }

      mapBtn.click();
    }
  }
})();
//长期维护QQ群：104168874
