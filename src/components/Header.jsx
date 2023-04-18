import { useEffect, useState } from "react";



function Header() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState("all");
  const [renderer, setRender] = useState([]);

  useEffect(() => {
    fetch(`https://inshorts.deta.dev/news?category=${count}`)
      .then(async (res) => {
        return await res.json();
      })
      .then((data) => {
        setRender(data.data);
        setData(data.data);
      });
  }, [count]);

  const search = (event) => {
    let newData = data.filter((el) => {
      if (
        el.title.trim().indexOf(event.target.value.toLowerCase().trim()) >= 0
      ) {
        return el;
      } else if (
        el.content.trim().indexOf(event.target.value.toLowerCase().trim()) >= 0
      ) {
        return el;
      } 
    });
    setRender(newData);
  };

  return (
    <div className="Fer">
      <h1>my projects</h1>
      <div className="box">
        <input
          className="inp"
          type="search"
          placeholder="name"
          onChange={search}
        />
        {/* <button className="bbtt">Enter</button> */}

        <select
          name="text"
          id="select"
          onChange={(e) => {
            setRender([])
            setCount(e.target.value);
          }}
        >
          <option className="btn">all</option>
          <option className="btn">sports</option>
          <option className="btn">technology</option>
          <option className="btn">business</option>
          <option className="btn">world</option>
          <option className="btn">politics</option>
          <option className="btn">automobile</option>
        </select>
      </div>
      <div className="css">
        {renderer.length ? (
          renderer.map((el) => {
            return (
              <ul>
                <div>{el.author}</div>
                <hr />
                <p>{el.date}</p>
                <hr />
                <p>title:{el.title}</p>
                <hr />
                <p>news: {el.content}</p>
                <hr />
                <p>{el.time}</p>
                <hr />
                <div className="img">
                  <img src={el.imageUrl} />
                </div>
              </ul>
            );
          })
        ) : (
          <span class="loader"></span>
        )}
      </div>
    </div>
  );
}

export default Header;
