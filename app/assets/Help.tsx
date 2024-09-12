import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
    color?: string,
    width?: number,
    stroke?: number,
}

function Help({
    color = "#000",
    width = 20,
    stroke = 3.5,
}: Props) {
    return (
        <Svg
            width={width}
            height={width}
            viewBox="0 0 28 28"
            fill="none"
        >
            <Path
                d="M9.526 23.516c.37 0 .642-.176 1.081-.572l3.244-2.926 5.748.008c2.645 0 4.13-1.529 4.13-4.14V9.059c0-2.61-1.485-4.14-4.13-4.14H8.393c-2.637 0-4.131 1.53-4.131 4.14v6.829c0 2.619 1.538 4.13 4.069 4.13h.352v2.55c0 .58.307.949.843.949zm4.483-9.545c-.519 0-.818-.29-.835-.818l-.123-4.385c-.018-.545.369-.923.949-.923.563 0 .976.386.958.931l-.14 4.377c-.018.537-.308.818-.81.818zm0 3.04c-.598 0-1.09-.43-1.09-1.01 0-.58.492-1.01 1.09-1.01.597 0 1.08.421 1.08 1.01s-.491 1.01-1.08 1.01z"
                fill={color}
            />
        </Svg>
    )
}

export default Help