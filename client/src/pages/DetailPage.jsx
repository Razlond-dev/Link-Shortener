import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export default function DetailPage() {
  const { token } = useContext(AuthContext);
  const [link, setlink] = useState(null);
  const linkId = useParams().id;
  const { request, loading } = useHttp();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setlink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
}
