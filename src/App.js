import { useState, useEffect } from 'react';
import './App.css';

function App() {

  let [inputData, setinputData] = useState({
    firstname: '',
    lastname: '',
    Email: '',
    img: null,
    contact: '',
    password: '',
    city: [],
  });
  let [userData, setuserData] = useState([])
  let [id, setId] = useState(-1)
  let [formErrors, setFormErrors] = useState({})
  let [search, setSearch] = useState('');

  useEffect(() => {
    let getdata = JSON.parse(localStorage.getItem('abc'));
    setuserData(getdata || []);
  }, []);

  const Validate = (key, value) => {
    switch (key) {
      case "firstname":
        if (!value) {
          return 'first name is required'
        } else {
          return ''
        }
      // case "lastname":
      //   if (!value) {
      //     return 'last name is required'
      //   } else {
      //     return ''
      //   }
      case 'Email':
        if (!value) {
          return 'email is required'
        } else {
          return ''
        }

      case 'password':
        if (!value) {
          return 'password is required'
        } else {
          return ''
        }
      case 'gender':
        if (!value) {
          return 'Gender is required'
        } else {
          return ''
        }
      default:
        return ""
    }
  }
  const handleChecked = (e) => {

    const { name, checked } = e.target;
    if (name === "allselect") {
      const selectedall = userData?.map((ele) => {
        return { ...ele, isChecked: checked }
      })
      setuserData(selectedall)
    } else {
      const selectind = userData?.map((ele, id) => {
        if (name === ele.id) {
          return { ...ele, isChecked: checked }
        }
        return ele
      })
      setuserData(selectind)
    }
  }

  const changehandler = (e) => {
    const { name, value } = e.target;
    setinputData({ ...inputData, [name]: value, id: new Date().getTime().toString(), })
    // setinputData({ ...inputData, [e.target.name]: e.target.value})
    console.log('inputdata', inputData)
  }
  
  const submitfun = () => {

    let errors = {};
    setFormErrors({});

    Object.keys(inputData).forEach((key) => {
      const error = Validate(key, inputData[key]);
      if (error) {
        errors[key] = error;
      }
    })

    if (Object.keys(errors).length) {
      setFormErrors(errors);
    }
    if (id !== -1) {
      const mydata = userData?.map((data, index) => {
        if (index === id) {
          return inputData
        }
        return data
      })
      setId(-1)
      setuserData(mydata)
      localStorage.setItem("abc", JSON.stringify(mydata));
    } else {
      setuserData([...userData, userData]);
      localStorage.setItem("abc", JSON.stringify([...userData, userData]));
      setuserData({
        firstname: '',
        Email: '',
        contact: '',
        password: '',
        gender: '',
        city: []
      })
    }
  }
  // const deletefun = (id) => {
  //   const deleteddata = userData.filter((ele, ind) => {
  //     return ind !== id
  //   });
  //   // console.log(deleteddata)
  //   setuserData(deleteddata);
  //   localStorage.setItem("abc", JSON.stringify(deleteddata));
  // }
  const deletefun = (id) => {
    userData.slice(id, 1);
  }

  const editfun = (index) => {
    const editeditem = userData.find((ele, ind) => {
      return ind === index
    })
    setinputData(editeditem)
    setId(index)
  }
  // const editfun = (index) =>{
  //   setinputData(userData[index])
  // }
  const checkboxHandler = (e) => {
    let { value } = e.target;
    let { city } = userData;

    if (city.includes(value)) {
      setuserData({
        ...userData, city: userData.city.filter(curelem => curelem !== value)
      })
    }
    else {
      setuserData({ ...userData, city: [...city, value] });
    }
    console.log('==userdata==',userData);
  }

  // const searchHandler = () => {
  //   let val = search;
  //   let getdata = JSON.parse(localStorage.getItem('abc'));
  //   setSearch('')    

  //   if (val.length === 0) {
  //     return setuserData(getdata)
  //   } 
  //     let filteredData = userData.filter((ele, index) => {
  //       return ele.firstname === val
  //     })
  //     setuserData(filteredData);
  // }
  let searchHandler = () => {
    let getMyData = JSON.parse(localStorage.getItem('abc'))
    if (search === '') {
      return setuserData(getMyData);
    }
    let setData = userData.filter((elem, id) => {
      return elem.firstname === search;
    })
    setuserData(setData);
    setSearch('')
  }
  const imageHandler = (e) => {
    setinputData({ ...userData, img: URL.createObjectURL(e.target.files[0]) });
  }


  // const checkhandler = (checked, id) => {
  //   let abc = []
  //   if (checked) {

  //     abc = [...indexes, id];
  //     abc = [...new Set([...abc])]
  //     setIndexes(abc)

  //   } else {

  //     abc = indexes.filter(ele => ele !== id);
  //     setIndexes(abc)
  //   }
  // }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td><div className="wrapper">
              <div className="title">
                Registration Form
              </div>
              <div>
                <span></span> <input type="search" value={search} placeholder='search user' onChange={(e) => { setSearch(e.target.value) }} />
                <button onClick={searchHandler}>search</button>
              </div><br />

              <div className="form">
                <div className="inputfield">
                  <label>First Name</label>
                  <input type="text" className="input" name='firstname' value={inputData.firstname} onChange={changehandler} />

                </div>

                <div className="inputfield">
                  <label>Email</label>
                  <input type="text" className="input" name='Email' value={inputData.Email} onChange={changehandler} />
                  <p>{formErrors?.lastname ? formErrors.lastname : ''}</p>
                </div>
                <div className="inputfield">
                  <label>Phone Number</label>
                  <input type="tel" className="input" name='contact' value={inputData.contact} onChange={changehandler} />
                  <p>{formErrors?.Email ? formErrors.Email : ''}</p>
                </div>
                <div className="inputfield">
                  <label>Password</label>
                  <input type="password" className="input" name='password' value={inputData.password} onChange={changehandler} />
                </div>
                <div className="inputfield">
                  <label>Image</label>
                  <input type="file" className="input" name='img' onChange={imageHandler} />
                </div>


                <div className="inputfield">
                  <input type="submit" value="Register" className="btn" onClick={submitfun} />
                </div>


                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="rajkot" onChange={checkboxHandler}
                    checked={inputData?.city?.includes("rajkot")} />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">Rajkot</label>
                </div>

                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="surat" onChange={checkboxHandler} checked={inputData?.city?.includes("surat")} />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">Surat</label>
                </div>

                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                    checked={inputData?.city?.includes("morbi")} value="morbi" onChange={checkboxHandler} />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">Morbi</label>
                </div>

                <div>
                  <input type="radio" value='male' name='gender' checked={inputData.gender === "male"} onChange={changehandler} />Male
                </div>
                <div>
                  <input type="radio" value="female" name="gender"
                    checked={inputData.gender === "female"} onChange={changehandler} />Female
                </div>
              </div>
            </div></td>
            <td>
              <div>
                <table>
                  <tbody>
                    {/* checked={userData.every((value)=>value?.isChecked)} */}
                    <tr>
                      <th><input type="checkbox" name='allselect' checked={userData?.every((item) => item.isChecked === true)} onChange={handleChecked} /></th>
                      <th>First Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Gender</th>
                      <th>Image</th>
                      <th>City</th>
                      <th>Action</th>
                    </tr>
                    {
                      (userData || []).map((item, index) => {
                        const { firstname, Email, contact, gender, city, img, id } = item;
                        return (
                          <tr key={id}>
                            <td><input type='Checkbox' name={id} checked={item?.isChecked} onChange={handleChecked} /></td>
                            <td>{firstname}</td>
                            <td>{Email}</td>
                            <td>{contact}</td>
                            <td>{gender}</td>
                            <td><img src={img}></img></td>
                            <td>{city?.map((c) => {
                              return c;
                            })}</td>
                            <td><button onClick={() => editfun(index)}>edit</button>
                              <button onClick={() => deletefun(index)}>delete</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                <button>delete checkbox</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default App;















