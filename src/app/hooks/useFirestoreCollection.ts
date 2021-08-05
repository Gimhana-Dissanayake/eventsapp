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
}

export default function useFirestoreCollection({ query, data, deps }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot: any) => {
        const docs = snapshot.docs.map((doc: any) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      (error: any) => dispatch(asyncActionError(error))
    );

    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}