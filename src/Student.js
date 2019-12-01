import React from 'react';

// let Student= (props)=>{
//     console.log("Callong user");
//     return(
//         <div>
//             <p>I am {props.userName}, my email id is {props.email}</p>
//         </div>
//     )
// };
// function onUpdate(props, s) {
//     console.log();
//     props.onUpdate(++s.like);
// }


function Student(props) {
    let { student, addLikes, addComments } = props;
    return (
        <div className="col-6 col-sm-6 col-md-6">
            <div className="alert alert-info">
                I'm {student.userName}. <img src={student.image} className="img-fluid" />
                <br /> My email {student.email} &nbsp;
                    <img src="/images/like.png" height="30px" width="30px"
                    onClick={() => { addLikes(student) }} />
                &nbsp;{student.like}<br />
                {student.defaultValue} 
                <input className="form-control" onBlur={(e) => { addComments(student, e) }} placeholder="Comments" />
                {student.comments.map((comment, idx) => {
                    return <div key={idx} className="text-monospace">{comment}</div>
                })}
                <br />
            </div>
        </div>
    );
}

export default Student;