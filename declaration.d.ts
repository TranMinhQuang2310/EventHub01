//Cấu hình hiển thị hình ảnh svg (Bước 2)
declare module '*.svg' {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content : React.FC<SvgProps>

    export default content
}