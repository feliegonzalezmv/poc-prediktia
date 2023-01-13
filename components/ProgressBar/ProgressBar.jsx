export const ProgressBar = ({ value }) => {
  if (value === 1) {
    return (
      <div className="forcast">
        <div className="rd"></div>
        <div className="rd lgt"></div>
        <div className="rd lgt"></div>
        <div className="rd lgt"></div>
        <div className="rd lgt"></div>
        <div className="rd lgt"></div>
      </div>
    );
  } else if (value === 2) {
    return (
      <div className="forcast">
        <div className="rd"></div>
        <div className="rd"></div>
        <div className="rd lgt"></div>
        <div className="rd lgt"></div>
        <div className="rd lgt"></div>
        <div className="rd lgt"></div>
      </div>
    );
  } else if (value === 3) {
    return (
      <div className="forcast">
        <div className="yw"></div>
        <div className="yw"></div>
        <div className="yw"></div>
        <div className="yw lgt"></div>
        <div className="yw lgt"></div>
        <div className="yw lgt"></div>
      </div>
    );
  } else if (value === 4) {
    return (
      <div className="forcast">
        <div className="yw"></div>
        <div className="yw"></div>
        <div className="yw"></div>
        <div className="yw"></div>
        <div className="yw lgt"></div>
        <div className="yw lgt"></div>
      </div>
    );
  } else if (value === 5) {
    return (
      <div className="forcast">
        <div className="gr"></div>
        <div className="gr"></div>
        <div className="gr"></div>
        <div className="gr"></div>
        <div className="gr"></div>
        <div className="gr lgt"></div>
      </div>
    );
  } else if (value === 6) {
    return (
      <div className="forcast">
        <div className="gr"></div>
        <div className="gr"></div>
        <div className="gr"></div>
        <div className="gr"></div>
        <div className="gr"></div>
        <div className="gr"></div>
      </div>
    );
  }
};
