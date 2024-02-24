import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById, resetLoading } from "../../redux/actions";
import CardID from "../../components/CardID/cardID.component";
import "./detail.styles.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(getDogById(id));
    dispatch(resetLoading());
  }, [dispatch, id]);

  return (
    <div className="container-detail">
      <CardID loading={loading} className="body" />
    </div>
  );
};

export default Detail;
