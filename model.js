AFRAME.registerComponent("createModels", {
    init: async function () {
  
      //Get the compund details of the element
      var models = await this.getmodels();
  
      var barcodes = Object.keys(models);
  
      barcodes.map(barcode => {
        var element = models[barcode];
  
        //Call the function
        this.createmodel(model);
      });
  
    },
    getmodels: function () {
      return fetch("js/modelList.json")
        .then(res => res.json())
        .then(data => data);
    },
    createmodel: async function (model) {
  
      //Element data
      var barcodeValue = model.barcode_value;
      var modelUrl = model.model_url;
      var modelName = model.model_name;
  
      var scene = document.querySelector("a-scene");
  
      //Scene
      var marker = document.createElement("a-scene");
    
      marker.setAttribute("id", `marker-${modelName}`);
      marker.setAttribute("type", "barcode");
      marker.setAttribute("model_name", modelName);
      marker.setAttribute("value", barcodeValue);
      marker.setAttribute("markerHandler", {});
      scene.appendChild(marker);
  
if(barcodeValue === 0){
  
      var modeEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("geometry", {
        primitive: "box",
        width: model.width,
        height: model.height
      });
  
      modelEl.setAttribute("material", {
          color: model.color
      });
      modelEl.setAttribute("position",model.position);
      modelEl.setAttribute("rotation",model.position);
  
      marker.appendChild(modelEl);
    } else {


    }
      //Create m
      var modelEl = 0.2;
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("gltf-model", `url(${modelName})`);
      modelEl.setAttribute("scale", model.scale);
      modelEl.setAttribute("position", model.position);
      modelEl.setAttribute("rotation", `${model.rotation}`);
      marker.appendChild(modelEl);

      

    }
  });