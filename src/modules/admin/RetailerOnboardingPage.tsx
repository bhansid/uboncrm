import { useEffect, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const CLOUD_NAME = "dohr3pfvl";
const UPLOAD_PRESET = "ubon_retailers";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzr1X4juNDVhrJcaZ_tIGkFyECF-AMU1iXQQygHVB5Cthfpy4knkM4xbK_uZJsZYZ5k/exec";

/* ================= FULL 47 COUNTY DATA ================= */

const kenyaData: Record<string, string[]> = {
  Nairobi: ["Westlands","Kilimani","Kasarani","Embakasi","Langata","Karen","Roysambu"],
  Mombasa: ["Nyali","Likoni","Changamwe","Kisauni","Mvita"],
  Kisumu: ["Kisumu Central","Kondele","Manyatta","Maseno"],
  Nakuru: ["Nakuru Town","Naivasha","Gilgil","Molo"],
  Kiambu: ["Thika","Ruiru","Juja","Limuru","Kiambu Town"],
  Machakos: ["Machakos Town","Athi River","Mlolongo"],
  Kajiado: ["Kitengela","Ngong","Ongata Rongai","Kajiado Town"],
  "Uasin Gishu": ["Eldoret","Burnt Forest","Turbo"],
  Meru: ["Meru Town","Maua","Nkubu"],
  Nyeri: ["Nyeri Town","Karatina","Othaya"],
  Kirinyaga: ["Kerugoya","Kutus","Sagana"],
  Muranga: ["Murang'a Town","Kenol","Kangari"],
  Embu: ["Embu Town","Runyenjes"],
  Laikipia: ["Nanyuki","Nyahururu"],
  Nyandarua: ["Ol Kalou","Engineer"],
  Bomet: ["Bomet Town","Sotik"],
  Kericho: ["Kericho Town","Litein"],
  Kakamega: ["Kakamega Town","Mumias"],
  Bungoma: ["Bungoma Town","Webuye"],
  Busia: ["Busia Town","Malaba"],
  Siaya: ["Siaya Town","Ugunja"],
  "Homa Bay": ["Homa Bay Town","Mbita"],
  Migori: ["Migori Town","Rongo"],
  Narok: ["Narok Town","Kilgoris"],
  Turkana: ["Lodwar","Lokichogio"],
  "West Pokot": ["Kapenguria"],
  "Trans Nzoia": ["Kitale"],
  "Elgeyo Marakwet": ["Iten"],
  Nandi: ["Kapsabet"],
  Baringo: ["Kabarnet"],
  Samburu: ["Maralal"],
  Marsabit: ["Marsabit Town"],
  Isiolo: ["Isiolo Town"],
  "Tharaka Nithi": ["Chuka"],
  "Taita Taveta": ["Voi","Wundanyi"],
  Kilifi: ["Kilifi Town","Malindi"],
  Kwale: ["Ukunda","Kwale Town"],
  "Tana River": ["Hola"],
  Lamu: ["Lamu Town"],
  Garissa: ["Garissa Town"],
  Wajir: ["Wajir Town"],
  Mandera: ["Mandera Town"],
  Vihiga: ["Mbale"],
  Kitui: ["Kitui Town","Mwingi"],
  Makueni: ["Wote"],
  Nyamira: ["Nyamira Town"],
  Kisii: ["Kisii Town"]
};

/* ======================================================= */

export default function RetailerOnboardingPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    Retailer_Name: "",
    Owner_Name: "",
    Phone: "",
    Area: "",
    County: "",
    City: "",
    Building_Name: "",
    Shop_Type: "",
    Latitude: "",
    Longitude: ""
  });

  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [createdId, setCreatedId] = useState("");
const [locationError, setLocationError] = useState<string | null>(null);

  /* ---------------- GPS ---------------- */

useEffect(() => {
  if (!navigator.geolocation) {
    setLocationError("Geolocation not supported in this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setForm((f: any) => ({
        ...f,
        Latitude: lat,
        Longitude: lng
      }));

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await res.json();

        const country = data.address.country;
        const detectedCounty = data.address.county;
        const detectedCity =
          data.address.city ||
          data.address.town ||
          data.address.suburb;

        if (country !== "Kenya") {
          setLocationError(
            "Auto-location only works inside Kenya. Please select County and City manually."
          );
          return;
        }

        if (kenyaData[detectedCounty]) {
          setForm((f: any) => ({
            ...f,
            County: detectedCounty
          }));

          const cities = kenyaData[detectedCounty].map((c) => ({
            label: c,
            value: c
          }));

          setCityOptions(cities);

          if (cities.find((c) => c.value === detectedCity)) {
            setForm((f: any) => ({
              ...f,
              City: detectedCity
            }));
          }
        } else {
          setLocationError(
            "County not recognized. Please select manually."
          );
        }
      } catch {
        setLocationError(
          "Could not detect location. Check internet connection."
        );
      }
    },
    (err) => {
      if (err.code === 1) {
        setLocationError(
          "Location permission denied. Please enable location access."
        );
      } else {
        setLocationError(
          "Unable to fetch location. Please select manually."
        );
      }
    }
  );
}, []);

  /* ---------------- IMAGE ---------------- */

  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    setImageUrl(json.secure_url);
  };

  /* ---------------- SUBMIT ---------------- */

  const submit = async () => {
    if (!form.Retailer_Name || !form.Phone || !form.City) {
      alert("Shop Name, Phone and City are required.");
      return;
    }

    setSubmitting(true);

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        action: "createRetailer",
        Retailer_Name: form.Retailer_Name,
        Owner_Name: form.Owner_Name,
        Phone: form.Phone,
        Area: form.Area,
        City: form.City,
        State: form.County,
        Latitude: form.Latitude,
        Longitude: form.Longitude,
        Building_Name: form.Building_Name,
        Shop_Type: form.Shop_Type,
        Shop_Image_URL: imageUrl
      })
    });

    const json = await res.json();
    setSubmitting(false);

    if (json.success) {
      setCreatedId(json.retailerId);
    } else {
      alert("Failed to create retailer");
    }
  };

  if (createdId) {
    return (
      <PageShell>
        <div style={successCard}>
          <h2>Retailer Created</h2>
          <p>ID: {createdId}</p>
          <button
            onClick={() => navigate(`/retailers/${createdId}`)}
            style={primaryBtn}
          >
            View Retailer
          </button>
        </div>
      </PageShell>
    );
  }

  const countyOptions = Object.keys(kenyaData).map(c=>({
    label:c,value:c
  }));

  return (
    <PageShell>
      <div style={container}>
        <h1 style={{ marginBottom: 30 }}>New Retailer</h1>

     {locationError && (
  <div style={{
    background:"#fef2f2",
    border:"1px solid #fecaca",
    padding:12,
    borderRadius:8,
    color:"#b91c1c",
    marginBottom:20
  }}>
    {locationError}
  </div>
)}

        <div style={section}>
          <h3 style={sectionTitle}>Basic Information</h3>

          <div style={responsiveGrid}>

            <FormInput label="Shop Name *"
              onChange={(v:string)=>setForm({...form,Retailer_Name:v})}/>

            <FormInput label="Owner Name"
              onChange={(v:string)=>setForm({...form,Owner_Name:v})}/>

            <FormInput label="Phone *"
              onChange={(v:string)=>setForm({...form,Phone:v})}/>

            <FormInput label="Street / Area"
              onChange={(v:string)=>setForm({...form,Area:v})}/>

            <div>
              <label style={labelStyle}>County *</label>
              <Select
                options={countyOptions}
                value={countyOptions.find(o=>o.value===form.County)}
                onChange={(opt:any)=>{
                  setForm({...form,County:opt.value,City:""});
                  setCityOptions(
                    kenyaData[opt.value].map(c=>({label:c,value:c}))
                  );
                }}
              />
            </div>

            <div>
              <label style={labelStyle}>City *</label>
              <Select
                options={cityOptions}
                value={cityOptions.find(o=>o.value===form.City)}
                onChange={(opt:any)=>
                  setForm({...form,City:opt.value})
                }
              />
            </div>

            <FormInput label="Building Name"
              onChange={(v:string)=>setForm({...form,Building_Name:v})}/>

            <FormSelect
              label="Shop Type"
              options={["Mobile","Accessories","Laptops","Electronics","All","Other"]}
              onChange={(v:string)=>setForm({...form,Shop_Type:v})}
            />

          </div>
        </div>

        <div style={section}>
          <h3 style={sectionTitle}>Shop Image</h3>

          <div style={uploadBox}>
            <input
              type="file"
              accept="image/*"
              onChange={(e)=>{
                if(e.target.files?.[0]){
                  uploadImage(e.target.files[0]);
                }
              }}
            />
            <p style={{fontSize:13,color:"#6b7280"}}>
              Upload clear front photo (optional)
            </p>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                style={{width:140,borderRadius:10,marginTop:10}}
              />
            )}
          </div>
        </div>

        <button
          onClick={submit}
          disabled={submitting}
          style={{...primaryBtn,marginTop:30}}
        >
          {submitting ? "Creating..." : "Create Retailer"}
        </button>

      </div>
    </PageShell>
  );
}

/* ===== Keep Your Original Styles ===== */

function FormInput({ label, onChange }: any) {
  return (
    <div style={{ width: "100%" }}>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle}
        onChange={(e)=>onChange(e.target.value)} />
    </div>
  );
}

function FormSelect({ label, options, onChange }: any) {
  return (
    <div style={{ width: "100%" }}>
      <label style={labelStyle}>{label}</label>
      <select style={inputStyle}
        onChange={(e)=>onChange(e.target.value)}>
        <option value="">Select</option>
        {options.map((o:string)=>(
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

const container={maxWidth:900,margin:"0 auto",background:"#fff",
padding:40,borderRadius:16,boxShadow:"0 8px 30px rgba(0,0,0,0.05)"};

const section={marginBottom:40};
const sectionTitle={marginBottom:20,fontSize:18};

const responsiveGrid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:20};

const inputStyle={
width:"100%",
padding:"12px 14px",
borderRadius:10,
border:"1px solid #d1d5db",
marginTop:6,
fontSize:14,
boxSizing:"border-box" as const};

const labelStyle={fontSize:13,fontWeight:500};

const uploadBox={
border:"1px dashed #d1d5db",
padding:20,
borderRadius:12};

const primaryBtn={
padding:"12px 22px",
background:"#111827",
color:"#fff",
borderRadius:10,
border:"none",
cursor:"pointer",
fontSize:14};

const successCard={
maxWidth:600,
margin:"0 auto",
background:"#fff",
padding:50,
borderRadius:16,
textAlign:"center" as const,
boxShadow:"0 8px 30px rgba(0,0,0,0.05)"};