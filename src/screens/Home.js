import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';

function Home() {
  const [search,setsearch]=useState('');
  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const LoadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Data:", data);
        setfoodcat(data.foodCategory);
        setfooditem(data.foodItems);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    LoadData();
  }, []);

  console.log("foodcat:", foodcat);
  console.log("fooditem:", fooditem);

  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div><NavBar /></div>
        <div style={{ flex: 1 }}>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
 
 <div className="carousel-item active">
   <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100"  style={{filter:"brightness(30%)"}} alt="..."/>
 </div>
 <div className="carousel-item">

   <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
 </div>
 <div className="carousel-item">
   <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>

 </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
 <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
 <span className="carousel-control-next-icon" aria-hidden="true"></span>
 <span className="visually-hidden">Next</span>
</button>
<div className="carousel-caption d-none d-md-block" style={{zIndex:"10"}}>
<div className='d-flex justify-content-center'>
         <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' value={search} onChange={(e)=>{setsearch(e.target.value)}}/>

</div>

</div>

<div>

</div>
        </div>
        <div className="container" style={{ marginTop: 'auto' }}>
          {foodcat && foodcat.length !== 0 ? (
            foodcat.map((data) => (
              <div className='row mb-3' key={data._id}>
                <div className="fs-3-m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {fooditem && fooditem.length !== 0 ? (
                  fooditem
                    .filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filterItems) => (
                      <div key={filterItems._id} className='col-12 col-mid-6 col-lg-3'>
                        <Card foodName={filterItems.name}
                              options={filterItems.options[0]}
                              imgSrc={filterItems.img} />
                      </div>
                    ))
                ) : (
                  <div>No such Data Found</div>
                )}
              </div>
            ))
          ) : (
            <div>No categories found</div>
          )}
        </div>
        <div><Footer /></div>
      </div>
    </>
  );
}

export default Home;
