import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
}

function NewConversation({
    color = "#000",
    width = 20,
}: Props) {
    return (
        <Svg
            width={width}
            height={width}
            viewBox="0 0 28 28"
            fill="none"
        >
            <Path
                d="M22.727 6.614l.66-.694c.334-.352.36-.835.026-1.169l-.228-.237c-.3-.3-.8-.255-1.125.07l-.686.668 1.354 1.362zm-10.406 9.352l1.802-.756 7.963-7.963-1.354-1.345-7.962 7.972-.791 1.74c-.088.202.14.43.342.352zm-3.34 5.897h10.24c1.687 0 2.68-.984 2.68-2.865V9.717l-1.757 1.749v7.374c0 .844-.449 1.265-1.038 1.265H9.096c-.809 0-1.248-.421-1.248-1.265V9.075c0-.844.44-1.265 1.248-1.265h7.462l1.749-1.758H8.98c-1.898 0-2.891.984-2.891 2.865v10.081c0 1.88.993 2.865 2.891 2.865z"
                fill={color}
            />
        </Svg>
    )
}

export default NewConversation