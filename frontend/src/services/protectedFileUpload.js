




const checkFile = theFile => {
  if(theFile.length === 0) return false;
  if (theFile.length > 0) return true;
}



const processFile = theFile => {
  if(checkFile(theFile)) {
    return theFile[0];
  }
  return false;
}





export {
  checkFile,
  processFile,

}
