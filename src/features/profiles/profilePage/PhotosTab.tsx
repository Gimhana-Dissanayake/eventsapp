import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import { getUserPhotos } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { RootState } from "../../../app/store/rootReducer";
import { listenToUserPhotos } from "../profileActions";

const PhotosTab = (props: any) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state: RootState) => state.async);
  const { photos } = useSelector((state: RootState) => state.profile);

  useFirestoreCollection({
    query: () => getUserPhotos(props.profile.id),
    data: (photos: any) => dispatch(listenToUserPhotos(photos)),
    deps: [props.profile.id, dispatch],
  });

  return (
    <Tab.Pane laoding={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`Photos`} />
          {props.isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add Photo"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo: any) => (
                <Card key={photo.id}>
                  <Image src={photo.url || "/assets/user.png"} />
                  <Button.Group fluid width={2}>
                    <Button basic color="green" content="Main" />
                    <Button basic color="red" icon="trash" />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default PhotosTab;
