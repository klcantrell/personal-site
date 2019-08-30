let str = React.string;

open SupStyles;
let styles = SupStyles.externalStyles;

[@react.component]
let make = () => <div className={styles |> Cx.extractSingleStyle(sup)}>{str("Sup")}</div>;

let default = make;