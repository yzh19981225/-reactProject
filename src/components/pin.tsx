import { Rate } from "antd";
import React from "react";

interface PinProps  extends React.ComponentProps<typeof Rate>{
    checked:boolean;
    onCheckedChenge?:( checked:boolean)=>void;
}

export const Pin = (props:PinProps)=>{
        const {checked , onCheckedChenge, ...restProps} = props
         return <Rate
            count={1}
            value={checked?1:0}
            onChange={num=>onCheckedChenge?.(!!num)}
            {...restProps}
         />
}