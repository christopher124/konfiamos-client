import emptyImage from "../../../assets/svg/story-404.svg";
import { Segment, Image } from "semantic-ui-react";

export function EmptyList(props) {
  const { title } = props;
  return (
    <Segment placeholder>
      <div className="text-center">
        <Image src={emptyImage} alt="Imagen vacía" size="medium" centered />
        <h2 className="p-3">{title}</h2>
      </div>
    </Segment>
  );
}
