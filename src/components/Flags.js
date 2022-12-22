import Germany from "../images/Germany.png";
import England from "../images/England.png";
import France from "../images/France.png";
import Denmark from "../images/Denmark.png";

export const getBadgeLang = (propsbadge) => {
  let badge;

  switch (propsbadge) {
    case "fr":
      badge = France;
      break;
    case "de":
      badge = Germany;
      break;
    case "denmark":
      badge = Denmark;
      break;
    case "uk":
      badge = England;
      break;
      default:
        badge = "";
  }
  return badge;
};
