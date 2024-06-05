import { useParams } from "react-router-dom";
import UseGetOnlyOne from "../../customhooks/UseGetOnlyOne";
import { useEffect, useState } from "react";

const Inboxfull = () => {
  const { id } = useParams();
  const [loading, fetchOnlyOneThing] = UseGetOnlyOne();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchOnlyOneThing(id);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded my-6">
        <div className="px-6 py-4">
          <div className="text-xl font-bold mb-2">Messages:</div>
          <div className="mb-4">{data?.content[0]?.content}</div>
          <div>
            <div className="text-xl font-bold mb-2">Sender:</div>
            <div>{data?.sender?.email}</div>
          </div>
          <div>
            <div className="text-xl font-bold mb-2">Recipient:</div>
            <div>{data?.recipient?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inboxfull;
