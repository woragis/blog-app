import { useListedPostModel } from "./model";
import {
  ListedPostAuthorData,
  ListedPostDescription,
  ListedPostMetaData,
  ListedPostTitle,
  StyledListedPost,
} from "./styles";

export const ListedPostView = ({}: ReturnType<typeof useListedPostModel>) => {
  return (
    <StyledListedPost>
      <ListedPostTitle>
        Usuarios descobrem a cura do luva de pedreiro
      </ListedPostTitle>
      <ListedPostDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
        dolorum? Ut id commodi cumque vero ducimus perspiciatis voluptatem nam
        sapiente, voluptates possimus molestias cupiditate ipsam, corporis
        numquam explicabo, harum molestiae.
      </ListedPostDescription>
      <ListedPostMetaData>
        <ListedPostAuthorData>Gustavo Lima</ListedPostAuthorData>
      </ListedPostMetaData>
    </StyledListedPost>
  );
};
