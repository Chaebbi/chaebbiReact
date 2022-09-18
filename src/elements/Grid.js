import styled from "styled-components";

function Grid(props){
    const {
        width,
        minwidth,
        height,
        col,
        row,
        colgap,
        rowgap,
        margin,
        padding,
        background,
        position,
        top,
        bottom,
        left,
        right,
        justify_content,
        align_content,
        children
    } = props;

    return(
        <GridBox
            width={width} 
            height={height}
            minwidth={minwidth}
            col={col} 
            row={row} 
            colgap={colgap} 
            rowgap={rowgap}
            margin={margin}
            padding={padding}
            position={position}
            top={top}
            bottom={bottom}
            left={left}
            right={right}
            background={background}
            justify-content={justify_content}
            align-content={align_content}>
                {children}
        </GridBox>
    )
}

Grid.defaultProps = {
    row: "1fr 1fr",
    margin: "0",
    padding: "0"
};

const GridBox = styled.div`
    display: grid;
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    justify-content: start;
    background-color: ${(props)=>props.background};
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    min-width: ${(props)=>props.minwidth};
    grid-template-columns: repeat(${(props)=>props.col}, 1fr);
    grid-template-rows: ${(props)=>props.row};
    column-gap: ${(props)=>props.colgap};
    row-gap: ${(props)=>props.rowgap};
    margin: ${(props)=>props.margin};
    padding: ${(props)=>props.padding};
    justify-content: ${(props)=>props.justify_content};
    align-content: ${(props)=>props.align_content};
    box-sizing: border-box;
`;

export default Grid;