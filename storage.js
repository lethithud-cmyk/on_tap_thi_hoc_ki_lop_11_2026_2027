window.STORE={
  profileKey:'tin_review_profile_v2',
  stateKey:g=>`tin${g}_review_v2`,
  defaults(){
    return {
      completedLessons:[],
      attempted:0,
      correct:0,
      wrongIds:[],
      wrongRecovery:{},
      lessonStats:{},
      levelStats:{},
      diagnosticHistory:[],
      examHistory:[],
      theme:'light'
    };
  },
  loadProfile(){
    try{return {...{name:'',className:'',studentCode:''},...(JSON.parse(localStorage.getItem(this.profileKey))||{})};}
    catch(e){return {name:'',className:'',studentCode:''};}
  },
  saveProfile(p){localStorage.setItem(this.profileKey,JSON.stringify(p));},
  load(g){
    try{
      const saved=JSON.parse(localStorage.getItem(this.stateKey(g)))||{};
      const out={...this.defaults(),...saved};
      out.wrongRecovery=out.wrongRecovery||{};
      out.lessonStats=out.lessonStats||{};
      out.levelStats=out.levelStats||{};
      out.diagnosticHistory=Array.isArray(out.diagnosticHistory)?out.diagnosticHistory:[];
      out.examHistory=Array.isArray(out.examHistory)?out.examHistory:[];
      out.completedLessons=Array.isArray(out.completedLessons)?out.completedLessons:[];
      out.wrongIds=Array.isArray(out.wrongIds)?out.wrongIds:[];
      return out;
    }catch(e){return this.defaults();}
  },
  save(g,d){localStorage.setItem(this.stateKey(g),JSON.stringify(d));},
  reset(g){localStorage.removeItem(this.stateKey(g));return this.defaults();}
};
