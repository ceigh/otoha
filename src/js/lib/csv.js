class Csv {
  constructor(data, name = 'document', headers = []) {
    if (headers.length) {
      headers = headers.slice(0, data[0].length);
      data.splice(0, 0, headers);
    }

    this.content = `data:text/csv;charset=utf-8,${data.map(
        e => e.join(',')).join('\n')}`;
    this.name = name;
  }


  download() {
    const encodedUri = encodeURI(this.content);
    const link = document.createElement('a');

    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${this.name}.csv`);
    document.body.appendChild(link);
    link.click();
  }
}


export default Csv;
