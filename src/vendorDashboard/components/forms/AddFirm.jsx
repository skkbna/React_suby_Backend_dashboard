import React, {useState} from 'react'
import { API_URL } from '../../Data/ApiPath';

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  

const handleCategoryChange = (event)=>{ 
   const value = event.target.value;
     if(category.includes(value)){
       setCategory(category.filter((item) => item !== value));
     }else{
       setCategory([...category, value])
     }
    
}
const handleRegionChange = (event)=>{ 
  const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item) => item !== value));
    }else{
      setRegion([...region, value])
    }
   
}

const handleImageUpload = (event)=>{
   const selectedImage = event.target.files[0];
   setFile(selectedImage)
}



const handleFirmSubmit = async(e)=>{
     e.preventDefault();
try {
    const loginToken = localStorage.getItem('loginToken');
    if(!loginToken){
       console.error("User not authenticated");
    }

    const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file)

      category.forEach((value)=>{
        formData.append('category', value)
      });
      region.forEach((value)=>{
        formData.append('region', value)
      })

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      })
      const data = await response.json()
      if(response.ok){
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null)
        alert("Firm added Successfully")
      }else if(data.message === "vendor can have only one firm"){
         alert("Firm Exists. Only 1 firm can be added")
      } else{
         alert("Failed to add Firm")
      }
      console.log("this is firmId", data.firmId)

      const mango = data.firmId;

      localStorage.setItem('firmId', mango)
      
      
} catch (error) {
   console.error("failed to add Firm")
   alert("failed to add Firm")
 }
}

  return ( 
          <div className="firmSection">
              <form className="tableForm" onSubmit= {handleFirmSubmit}>
                <h2>Add firm</h2>
                  <label>Firm Name</label>
                  <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
                  <label>Area</label>
                  <input type="text" name='area'  value={area} onChange={(e)=>setArea(e.target.value)}/>
                  {/*<label>Category</label>
                    <input type="text" /> */}
            <div className="checkInp">
              <label >Category</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                      <label>Veg</label>
                      <input type="checkbox" checked = {category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
                    </div>
                  <div className="checkboxContainer">
                    <label>Non-Veg</label>
                <input type="checkbox" checked = {category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
                  </div>
             </div>


            </div>
                  <label>offer</label>
                  <input type="text" name='offer'  value={offer} onChange={(e)=>setOffer(e.target.value)}/>
            <div className="checkInp">
              <label >Region</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                      <label>South Indian</label>
                      <input type="checkbox" value="south-indian"  checked ={region.includes('south-indian')}
                      onChange={handleRegionChange}
                      />
                    </div>
                  <div className="checkboxContainer">
                    <label>North_Indian</label>
                    <input type="checkbox" value="north-indian" checked ={region.includes('north-indian')} 
                    onChange={handleRegionChange}
                    />
                  </div>
                  <div className="checkboxContainer">
                      <label>Chinese</label>
                      <input type="checkbox" value="chinese" checked ={region.includes('chinese')} 
                      onChange={handleRegionChange}
                      />
                    </div>
                  <div className="checkboxContainer">
                    <label>Bakery</label>
                    <input type="checkbox" value="bakery"  checked ={region.includes('bakery')} 
                     onChange= {handleRegionChange} 
                   />
                  </div>
                </div>
            </div>
                  <label>Firm Image</label>
                  <input type="file" onChange= {handleImageUpload} />
                  <br />
                  <div className="btnsubmit">
                    <button type="submit">Submit</button>
                </div>
               </form>
        </div>
  )
}


export default AddFirm