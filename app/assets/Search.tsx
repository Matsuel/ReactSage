import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
}

function Search({
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
                d="M12.532 19.033a6.873 6.873 0 003.797-1.142l3.85 3.858c.255.246.58.37.931.37.73 0 1.266-.572 1.266-1.293 0-.334-.114-.659-.36-.905l-3.824-3.84a6.86 6.86 0 001.257-3.965c0-3.805-3.111-6.917-6.917-6.917-3.797 0-6.917 3.112-6.917 6.917 0 3.806 3.112 6.917 6.917 6.917zm0-1.846c-2.786 0-5.071-2.285-5.071-5.07 0-2.787 2.285-5.072 5.071-5.072 2.786 0 5.072 2.285 5.072 5.071 0 2.786-2.286 5.072-5.072 5.072z"
                fill={color}
            />
        </Svg>
    )
}

export default Search