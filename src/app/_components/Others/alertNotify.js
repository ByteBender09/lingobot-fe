import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const AlertNotify = (title, small = false) => {
  if (!small)
    return (
      <div className="text-sm font-light text-red-600 mb-3">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          style={{ paddingRight: "4px" }}
        />
        {title}
      </div>
    );
  else
    return (
      <span className="text-sm font-light text-red-600 mb-3">{title}</span>
    );
};
