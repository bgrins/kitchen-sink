function StandardAlert(props) {
  let className = `usa-alert usa-alert--${props.type || "info"}`;
  return (
    <div className={className}>
      <div class="usa-alert__body">
        <h4 class="usa-alert__heading">{props.heading}</h4>
        <p class="usa-alert__text">{props.children}</p>
      </div>
    </div>
  );
}

export function WarningAlert(props) {
  return <StandardAlert type="warning" {...props}></StandardAlert>;
}
export function InformativeAlert(props) {
  return <StandardAlert type="info" {...props}></StandardAlert>;
}

export function ErrorAlert(props) {
  return <StandardAlert type="error" {...props}></StandardAlert>;
}

export function SuccessAlert(props) {
  return <StandardAlert type="success" {...props}></StandardAlert>;
}
