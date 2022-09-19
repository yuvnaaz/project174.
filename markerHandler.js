var modelList =[]
AFRAME.registerComponent("handler",{
    init: async function () {
        var compounds = await this.getCompounds();
    
        this.el.addEventListener("markerFound", () => {
          var modelName = this.el.getAttribute("model_name");
          var barcodeValue = this.el.getAttribute("value");
          modelList.push({ model_name: modelName, barcode_value: barcodeValue });
    
          // Changing Compound Visiblity
          models[barcodeValue]["compounds"].map(item => {
            var models = document.querySelector(`#${item.model_name}-${barcodeValue}`);
            models.setAttribute("visible", true);
          });
        });
    
        this.el.addEventListener("markerLost", () => {
          var modeName = this.el.getAttribute("element_name");
          var index = modelList.findIndex(x => x.model_name === model_name);
          if (index > -1) {
            modelList.splice(index, 1);
          }
        });
      },
      getDistance: function(elA,elB){
          return elA.object3D.position.distance.distanceTo(elB.object3D.position);
      },
      getModelGeometry: function(models, modelName){
          var barcodes = Object.keys(models);
          for(var barcode of barcodes){
              if(models[barcode].model_name === modelName){
                  return {
                      position: models[barcode]["placement_position"],
                      rotation: models[barcode]["placement_rotation"],
                      scale: models[barcode]["placement_scale"],
                      model_url: models[barcode]["model_url"]
                  };
              }
          }
      },
      placeTheModel: function(modelName, models){
          var isListContainModel = this.isModePresentInArray(modelList, modelName);
          if (isListContainModel){
              var distance = null;
              var marker1 = document.querySelector(`#marker-base`);
              var marker1 = document.querySelector(`#marker-${modelName}`);

              distance = this.getDistance(marker1,marker2);
              if(distance < 1.25){
                  var modelEl = document.querySelector(`#model-${modelName}`)
                  modeEl = setAttribute("visible", false);

                  var isModelPlaces = document.querySelector(`#model-${modelName}`);
                  if(isModelPlaced === null){
                      var el = document.createElement("a-entity");
                      var modelGeometry = this.getModelgeometry(models,modelName);
                      el.setAttribute("id",`model-${modelName}`);
                      el.setAttribute("gltf-model", `url`);
                      el.setAttribute("position", getModelGeometry.position);
                      el.setAttribute("rotation", getModelGeometry.rotation);
                      el.setAttribute("scale", getModelGeometry.scale);
                      marker1.appendChild(el);

                  }                  

              }

              
          }
      },
      isModelPresentInArray: function(arr, val){
          for( var i of arr){
              if(i.model_name === val){
                  return true;
              }
          }
          return false;
      },
      tick: async function(){
      if(modelList.length >1){
          var isBaseModelPresent = this.isModelPresentInArray(modelList, "base")
          var messageText = document.querySelector("#message-text");

          if(!isBaseModelPresent){
              messageText.setAttribute("visible", true);
          } else {
              if(mode === null) {
                  models = await this.getModel();
              }

              messageText.setAttribute("visible", false);
              this.placeTheModel("road", models)
              this.placeTheModel("car", models)
              this.placeTheModel("building1", models)
              this.placeTheModel("building2", models);
              this.placeTheModel("building3", models);
              this.placeTheModel("tree", models);
              this.placeTheModel("sun", models);
          }

      }

      }

    }

})