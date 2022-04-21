let user_info = {};

let analytics = {};

let positions = { data: [] };
(() => {
  //Abstract API to Get user location information
  const axios = require('axios');
  axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=07e7ac4b727a4ade8bdd4fe4ac8d4601')
      .then(response => {
          console.log(response.data);
          user_info.data.push(response.data);
      })
      .catch(error => {
          console.log(error);
      });

  document.addEventListener("mousemove", (e) => {
    let position = {
      time: Date.now(),
      x: e.pageX,
      y: e.pageY,
    };
    positions.data.push(position); // do it atomic
    var bubble = document.createElement("div");
    bubble.style.position = "absolute";

    bubble.style.left = `${e.pageX}px`;
    bubble.style.top = `${e.pageY}px`;
    bubble.style.width = "11px";
    bubble.style.height = "11px";
    bubble.style.background = "#fff";
    bubble.style.borderRadius = "50%";
    bubble.style.zIndex = "9999999";
    bubble.style.pointerEvents = "none";

    $(".grid").append(bubble);
  });

  Array.prototype.slice.call(document.querySelectorAll("*")).forEach((node) => {
    node.dataset.flow &&
      (analytics[node.dataset.flow] = { clicked: 0, mouseover: 0 });
    node.dataset.flow &&
      node.addEventListener("click", () => {
        analytics[node.dataset.flow].clicked++;
        console.log(analytics);
      });
    node.dataset.flow &&
      node.addEventListener("mouseover", () => {
        analytics[node.dataset.flow].mouseover++;
        
        console.table(analytics);
        
      });
  });

  
  async function httpPost(url, data) {
    var xhr = new XMLHttpRequest();
    await xhr.open("POST", url, false);
    await xhr.setRequestHeader("Content-Type", "application/json");
    await xhr.send(JSON.stringify(data));
    return await xhr.status;
  }
  const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
  };
  setInterval(() => {
    var flowAnalytics = JSON.stringify(positions);
 
  }, 30000);

  setInterval(async function () {
    await httpPost(`http://localhost:3030/collect`, {
      data: {
       analytics: analytics,
       positions: positions
      }
        });
  }, 10000);

})();
