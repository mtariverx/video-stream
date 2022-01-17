import React, { Component } from "react";
import { ResizableBox } from "react-resizable";
import Resizer from "react-image-file-resizer";

import { Radio, InputField } from "../../../../../components";
import { dataURLtoFile } from "../../../../../utils/UrlToFile";

import "react-resizable/css/styles.css";
import "./style.scss";

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "Base64 Endcoded",
      width: 500,
      height: 300,
      value:
        props.overlay.image === "tmp/logo.png" ? null : props.overlay.image,
    };
  }

  componentDidMount = () => {
    if (this.props.overlay.id && this.props.overlay.image.startsWith("data:")) {
      this.setState({
        originalFileObj: dataURLtoFile(
          localStorage.getItem("overlay_image"),
          "overlay-image.png"
        ),
      });

      let file = dataURLtoFile(this.props.overlay.image, "overlay-image.png");
      let blob = URL.createObjectURL(file);
      let img = new Image();
      img.src = blob;
      img.onload = () => {
        this.setState({ width: img.width, height: img.height });
      };
    }
  };

  changeOption = (option) => this.setState({ option, value: null });

  onChange = (evt) => {
    this.setState({ value: evt.target.value });
    if (this.props.onChange) {
      this.props.onChange(evt.target.value);
    }
  };

  fileChangedHandler = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          localStorage.setItem("overlay_image", reader.result);
        },
        false
      );
      reader.readAsDataURL(event.target.files[0]);
      this.setState({
        originalFileObj: event.target.files[0],
        value: localStorage.getItem("overlay_image"),
      });
      if (this.props.onChange) {
        this.props.onChange(localStorage.getItem("overlay_image"));
      }

      // this.setState({
      //   originalFileObj: event.target.files[0],
      //   value: URL.createObjectURL(event.target.files[0]),
      // });

      // try {
      //   Resizer.imageFileResizer(
      //     event.target.files[0],
      //     500,
      //     500,
      //     "PNG",
      //     100,
      //     0,
      //     (uri) => {
      //       let file = dataURLtoFile(uri, "overlay_image.png");
      //       let blob = URL.createObjectURL(file);
      //       let img = new Image();
      //       img.src = blob;
      //       img.onload = () => {
      //         this.setState({
      //           width: img.width,
      //           height: img.height,
      //           value: uri,
      //         });
      //       };
      //       if (this.props.onChange) {
      //         this.props.onChange(uri);
      //       }
      //     },
      //     "base64"
      //   );
      // } catch (err) {
      //   console.log(err);
      // }
    }
  };

  onResize = (event, { element, size, handle }) => {
    Resizer.imageFileResizer(
      this.state.originalFileObj,
      size.width,
      size.height,
      "PNG",
      100,
      0,
      (uri) => {
        let file = dataURLtoFile(uri, "overlay_image.png");
        let blob = URL.createObjectURL(file);
        let img = new Image();
        img.src = blob;
        img.onload = () => {
          this.setState({
            width: size.width,
            height: size.height,
            value: uri,
          });
        };
        // this.setState({
        //   width: size.width,
        //   height: size.height,
        //   value: uri,
        // });
        if (this.props.onChange) {
          this.props.onChange(uri);
        }
      },
      "base64"
    );
  };

  render() {
    const { option, value, width, height } = this.state;

    return (
      <div className="input-component">
        <div className="title">Use Image Form</div>
        <div className="select-pandel">
          <Radio
            checked={option === "URL"}
            onChange={() => this.changeOption("URL")}
          >
            URL
          </Radio>
          <Radio
            checked={option === "Relative Path"}
            onChange={() => this.changeOption("Relative Path")}
          >
            Relative Path
          </Radio>
          <Radio
            checked={option === "Base64 Endcoded"}
            onChange={() => this.changeOption("Base64 Endcoded")}
          >
            Upload Image
          </Radio>
        </div>
        {option === "URL" && (
          <InputField label="URL" onChange={this.onChange} />
        )}
        {option === "Relative Path" && (
          <InputField label="Relative Path" onChange={this.onChange} />
        )}
        {option === "Base64 Endcoded" && (
          <>
            <div style={{ marginBottom: "20px" }}>
              <input type="file" onChange={this.fileChangedHandler} />
            </div>
            {value && (
              <ResizableBox
                width={width}
                height={height}
                onResize={this.onResize}
                // style={{ margin: "auto" }}
              >
                <img
                  alt="Base64FileImage"
                  src={value}
                  id="overlay_image"
                  width={width}
                  height={height}
                />
              </ResizableBox>
            )}
          </>
        )}
      </div>
    );
  }
}

export default InputComponent;
