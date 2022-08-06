import { useState, useEffect } from "react";
import axios from "axios";
const Homepage = () => {
    const [file, setFile] = useState(null);
    const [selected, setSelected] = useState({ index: null, selected: false });
    const [templates, setTemplates] = useState([]);
    async function handleSubmit() {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const resp = await axios.post(
                "http://localhost:8081/api/email-template/bulk/" +
                    selected.index,
                formData
            );
            if (resp.status === 200) {
                alert("success");
            }
        } catch (error) {}
    }

    useEffect(() => {
        const resp = axios
            .get("http://localhost:8081/api/email-template/read")
            .then((resp) => {
                setTemplates(resp.data);
            });
    }, []);
    return (
        <>
            <div>
                <h2 style={{ textAlign: "center" }}>Email templates</h2>
                <hr />
                <br />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "30px",
                    }}
                >
                    {templates &&
                        templates.map((temp, index) => {
                            return (
                                <div
                                    onClick={() =>
                                        setSelected((prev) => ({
                                            ...prev,
                                            selected: true,
                                            index: temp._id,
                                        }))
                                    }
                                    style={{
                                        fontSize:
                                            selected.index === temp._id &&
                                            selected.selected
                                                ? "56px"
                                                : "50px",
                                        color:
                                            selected.index === temp._id &&
                                            selected.selected
                                                ? "blue"
                                                : "",
                                    }}
                                >
                                    {" "}
                                    Template {index + 1}
                                </div>
                            );
                        })}
                </div>
            </div>
            <br />
            <br />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <input
                    type="file"
                    id="actual-btn"
                    hidden
                    onChange={(e) => setFile((prev) => e.target.files[0])}
                />
                <label className="label1" for="actual-btn">
                    Choose File
                </label>
            </div>
            {file && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        // fontSize: "30px",
                        padding: "20px",
                    }}
                >
                    <h2>The file is {file?.name}</h2>
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px",
                }}
            >
                <button
                    style={{
                        color: "blue",
                        width: "150px",
                        height: "50px",
                        fontSize: "30px",
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default Homepage;
