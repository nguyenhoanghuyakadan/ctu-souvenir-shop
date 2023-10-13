import { universitiesData } from "../../../static/data";

const Universities = () => {
  return (
    <div class="grid grid-cols-4 gap-4">
      {universitiesData.map((u) => (
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={u.image_Url} alt={u.title} className="rounded-xl w-max" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{u.title}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Universities;
