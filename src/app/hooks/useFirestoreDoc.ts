import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/asyncReducer";
import { dataFromSnapshot } from "./../firestore/firestoreService";

interface Props {
  query: any;
  data: any;
  deps: any;
  shouldExecute?: boolean;
}

export default function useFirestoreDoc({
  query,
  data,
  deps,
  shouldExecute = true,
}: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) return;
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot: any) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              data: "not-found",
              message: "Could not find document",
            })
          );
          return;
        }

        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      (error: any) => dispatch(asyncActionError(error))
    );

    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
