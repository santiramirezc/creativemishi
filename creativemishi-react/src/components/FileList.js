const FileList = (props) => {
  const { files, selectFinal, deleteFile, showDownload, showControls } = props
  const AWS_URL = process.env.REACT_APP_AWS_ENDPOINT
  
  return (
    <ul className="collection with-header">
      <li className="collection-header center"><h5>Contribution files</h5></li>
      {
        files ?
          files.map(file => {
            return (
            <li key={file.label} className="collection-item">
              <div>{file.label}
              {
        showControls ?
          <>
            <a href={''} className="secondary-content" onClick={e => deleteFile(e,file.label)}><i className="material-icons">cancel</i></a>
            <a href={''} className="secondary-content" onClick={e => selectFinal(e,file.label)}><i className="material-icons">check</i></a>
          </>
        :
        <a href={file.location} className="secondary-content" ><i className="material-icons">download</i></a>        
      }
              </div>
            </li>
            )
          })
        :
        ""
      }
    </ul>
  )
}

export default FileList