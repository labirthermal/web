
const containerStyle = {
    maxWidth: "calc(100% - 10px)",
    paddingTop: "6px",
    paddingBottom: "12px"
};

const labelStyle = {
    color: "--wp-component-color-foreground",
    fontSize: "11px",
    fontWeight: "600",
    lineHeight: "1.4",
    textTransform: "uppercase",
    boxSizing: "border-box",
    display: "block",
    paddingTop: "0px",
    paddingBottom: "8px",
    maxWidth: "100%"
};

const descriptionStyle = {
    color: "rgb(117, 117, 117)",
    fontStyle: "normal",
    marginTop: "8px",
    fontSize: "12px",
    marginBottom: "0px"
}

export default function Field({
    label,
    children,
    description
}) {
    return <div style={containerStyle}>
        {label && <label style={labelStyle}>{label}</label>}
        {children}
        {description && <p style={descriptionStyle}>{description}</p>}
    </div>
}