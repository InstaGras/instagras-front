export class User {
    username: string;
    lastname: string;
    firstname: string;
    nbFollowers: string;
    nbFollowed: string;

    constructor(username: string, firstname: string, lastname: string){
        this.username=username;
        this.firstname=firstname;
        this.lastname=lastname;
    }

    getUserIdentity() {
          const userIdentity = (
            ((this.firstname) ? this.firstname : '')
            + ' '
            + ((this.lastname) ? this.lastname : '')
          ).toLowerCase().trim();
          return (userIdentity) ? userIdentity[0].toUpperCase() + userIdentity.slice(1) : 'Identité non saisie';
    }
}

