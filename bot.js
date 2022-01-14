//农民世界机器人V1.5
(async () => {
  // 可选择要执行的的地图
  // 1 — 矿业
  // 2 — 鸡舍
  // 3 — 种地
  // 4 — 牛舍
  // 例如：const availableMaps = [1];表示执行矿业
  const availableMaps = [1, 2, 3, 4];
  // 移动到下一个地图之间的延迟（5秒）
  const delayNextMap = [5 * 1000, 15 * 1000];
  // 地图选择后的延迟（5秒）
  const delayAfterMapSelect = [5 * 1000, 15 * 1000];
  // 找到后的延迟（1秒）
  const delayAfterMine = [10 * 1000, 25 * 1000];
  // 维修开始前的延迟（10秒）
  const delayBeforeRepair = [8 * 1000, 15 * 1000];
  // 维修开始后延迟（1秒）
  const delayAfterRepair = [1 * 1000, 3 * 1000];

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  setInterval(() => {
    const buttonClosePopup = document.querySelector(
      ".modal .plain-button.short"
    );

    if (buttonClosePopup) buttonClosePopup.click();
  }, random(1, 2) * 1000);

  setInterval(() => {
    const buttonCloseCPUPopup = document.querySelector(
      ".modal-stake .modal-stake-close img"
    );

    if (buttonCloseCPUPopup) buttonCloseCPUPopup.click();
  }, random(1, 2) * 1000);

  const mapBtn = document.querySelector(".navbar-group--icon[alt='Map']");
  mapBtn.click();

  while (1) {
    try {
      for (let mapId = 0; mapId < 4; ++mapId) {
        if (!availableMaps.includes(mapId + 1)) continue;

        await new Promise((res) => setTimeout(res, random(...delayNextMap)));

        const map = document.querySelectorAll(".map-container-bg")[mapId];

        if (map.style.filter === "grayscale(1)") continue;

        map.click();

        await new Promise((res) =>
          setTimeout(res, random(...delayAfterMapSelect))
        );

        for (const [, item] of document
          .querySelectorAll(".vertical-carousel-container img")
          .entries()) {
          // 恢复能量开始
          const currentFish = Math.floor(
            +document.querySelectorAll(".resource-number")[2].innerText
          );
          const [currentEnergy, maxEnergy] = document
            .querySelectorAll(".resource-number")[3]
            .textContent.split("/")
            .map(Number);

          if (maxEnergy - currentEnergy > 100 && currentFish > 1) {
            const countEnergyClicks = Math.min(
              currentFish,
              Math.floor((maxEnergy - currentEnergy) / 5)
            );

            if (countEnergyClicks > 0) {
              document.querySelector(".resource-energy img").click();
              await new Promise((res) => setTimeout(res, random(1, 2) * 1000));

              for (let i = 0; i++ < countEnergyClicks; ) {
                document
                  .querySelector(".image-button[alt='Plus Icon']")
                  .click();
                await new Promise((res) =>
                  setTimeout(res, random(2, 10) * 100)
                );
              }
              document.querySelector(".modal-wrapper .plain-button").click();
              await new Promise((res) =>
                setTimeout(res, random(15, 15) * 1000)
              );
            }
          }
          // 恢复能量结束

          item.click();

          await new Promise((res) => setTimeout(res, random(1, 2) * 1000));

          const buttonMine = document.querySelector(
            ".info-section .plain-button"
          );
          const timeToEnd = document.querySelector(
            ".info-section .info-time"
          ).innerText;

          if (
            ![...buttonMine.classList].includes("disabled") &&
            (timeToEnd === "00:00:00" || mapId === 0)
          ) {
            buttonMine.click();

            await new Promise((res) =>
              setTimeout(res, random(...delayAfterMine))
            );

            // 判断地图和执行
            if (mapId === 0) {
              await new Promise((res) =>
                setTimeout(res, random(...delayBeforeRepair))
              );

              // 维修工具
              const buttonRepair = document.querySelectorAll(
                ".info-section .plain-button"
              )[1];
              if (buttonRepair) {
                const quality = eval(
                  document.querySelector(".card-number").innerText
                );
                if (
                  ![...buttonRepair.classList].includes("disabled") &&
                  quality < 0.5
                ) {
                  buttonRepair.click();
                  await new Promise((res) =>
                    setTimeout(res, random(...delayAfterRepair))
                  );
                }
              }
            }
          }
        }

        mapBtn.click();
      }
    } catch (e) {
      mapBtn.click();
    }
  }
})();
//长期维护QQ群：104168874
