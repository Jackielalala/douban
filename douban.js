$('footer>div').on('click',function(){
  $(this).addClass('active').siblings().removeClass('active');
  var Index=$(this).index();
  $('section').eq(Index).addClass('active').siblings().removeClass('active');
})

getDataTop();
var index = 0;
var isLoading=false;

function getDataTop(){
  $('.loading').show();
  if(isLoading){return;}/*函数节流 */
  isLoading=true;/*函数节流*/
  $.ajax({
    url:'https://api.douban.com/v2/movie/top250',
    type:'GET',
    data:{
    start:index,
    count:20
    },
    dataType:'jsonp'
  }).done(function(ret){
    console.log(ret);
    renderTop(ret);
    index += 20;
    $('div.loading').hide();
    isLoading=false;/*函数节流*/
  }).fail(function(){
    console.log('error...');
  }).always(function(){
    $('.loading').hide();
  });
}

function renderTop(data){
  data.subjects.forEach(function(movie){
    var html= '<div class="item"><div class="imagebox"><img src="#" alt=""></div><div class="descript"><h2></h2><p class="type">1994/犯罪、剧情</p><p class="director">导演：弗兰克·德拉邦特</p><p class="actor">主演：蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</p></div></div>';
    var $node=$(html);
    $node.find('img').attr('src',movie.images.small);
    $node.find('.descript h2').text(movie.title);
    $node.find('.director').text('导演：'+movie.directors[0].name);
    function actors(){
      var actorsArr=[];
      movie.casts.forEach(function(item){
        actorsArr.push(item.name);
      })
      return actorsArr.join('、')
    }
    $node.find('.actor').text('主演：'+actors());
    $node.find('.descript .type').text(function(){
      var typeArr=[];
      movie.genres.forEach(function(item){
        typeArr.push(item);
      })
      return (movie.year+'/'+typeArr.join('、'))
    })
    $('.top250').append($node); 
  });
}

$(window).on('scroll',function(){
  if($('section#top').height()+30 <= $(window).height()+$(window).scrollTop()){
    getDataTop();
  }
})



 $('footer>div').eq(1).on('click',function(){
   getDataUs();
 })
 var isloading=false;
 function getDataUs(){
  $('.loading').show();
  if(isloading){return;}/*函数节流 */
  isloading=true;/*函数节流*/
  $.ajax({
    url:'https://api.douban.com/v2/movie/us_box',
    type:'GET',
    dataType:'jsonp'
  }).done(function(ret){
    console.log(ret);
    renderUs(ret);
    $('div.loading').hide();
    isloading=false;/*函数节流*/
  }).fail(function(){
    console.log('error...');
  }).always(function(){
    $('.loading').hide();
  });
}

function renderUs(data){
  data.subjects.forEach(function(movie){
    var html= '<div class="item"><div class="imagebox"><img src="#" alt=""></div><div class="descript"><h2></h2><p class="type">1994/犯罪、剧情</p><p class="director">导演：弗兰克·德拉邦特</p><p class="actor">主演：蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</p></div></div>';
    var $node=$(html);
    $node.find('img').attr('src',movie.subject.images.small);
    $node.find('.descript h2').text(movie.subject.title);
    $node.find('.director').text('导演：'+movie.subject.directors[0].name);
    function actors(){
      var actorsArr=[];
      movie.subject.casts.forEach(function(item){
        actorsArr.push(item.name);
      })
      return actorsArr.join('、')
    }
    $node.find('.actor').text('主演：'+actors());
    $node.find('.descript .type').text(function(){
      var typeArr=[];
      movie.subject.genres.forEach(function(item){
        typeArr.push(item);
      })
      return (movie.subject.year+'/'+typeArr.join('、'))
    })
    $('.us').append($node); 
  });
}








var INDEX=0;
var whetherload=false;
function getDataSearch(){
  if(whetherload){return;}
  whetherload=true;
  var keyword=$('input').val();
  $('.loading').show();
  $.ajax({
    url:'https://api.douban.com/v2/movie/search',
    type:'GET',
    data:{
      q:keyword/*重点*/,
      start:INDEX,
      count:20
    },
    dataType:'jsonp'
  }).done(function(ret){
    console.log(ret);
    renderSearch(ret);
    INDEX += 20;
    whetherload=false;
  }).fail(function(){
    console.log('error...');
  }).always(function(){
    $('.loading').hide();
  })
 }

 function renderSearch(data){
  data.subjects.forEach(function(movie){
    var html= '<div class="item"><div class="imagebox"><img src="#" alt=""></div><div class="descript"><h2></h2><p class="type">1994/犯罪、剧情</p><p class="director">导演：弗兰克·德拉邦特</p><p class="actor">主演：蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</p></div></div>';
    var $node=$(html);
    $node.find('img').attr('src',movie.images.small);
    $node.find('.descript h2').text(movie.title);
    function directorArr(){
      var directorsArr=[];
      movie.directors.forEach(function(item){
        directorsArr.push(item.name);
      })
      return directorsArr.join('、')
    }
    $node.find('.director').text('导演：'+directorArr());
    function actors(){
      var actorsArr=[];
      movie.casts.forEach(function(item){
        actorsArr.push(item.name);
      })
      return actorsArr.join('、')
    }
    $node.find('.actor').text('主演：'+actors());
    $node.find('.descript .type').text(function(){
      var typeArr=[];
      movie.genres.forEach(function(item){
        typeArr.push(item);
      })
      return (movie.year+'/'+typeArr.join('、'))
    })
    $('.search-result').append($node); 
  });
}

$('#search span').on('click',function(){
  getDataSearch();
})


$(window).on('scroll',function(){
  if($('section#search').height()+50 === $(window).height()+$(window).scrollTop()){
    if(clock){clearTimeout(clock);}
    var clock=setTimeout(function(){
      getDataSearch();
    },5000)
  }
})






















/*var usIndex = 0;
function getUsData(){
  $.ajax({
    url:'https://api.douban.com/v2/movie/us_box',
    type:'GET',
    data:{
    start:usIndex,
    count:20
  },/*在豆瓣api中可查
    dataType:'jsonp'
  }).done(function(ret){
     console.log(ret);
     render(ret);
     usIndex += 20;
     $('.iconfont').hide();
  }).fail(function(){
    console.log('error...');
  });

$('#top').on('scroll',function(){
  getUsData();
})*/

/*var top = {
  init:function(){
    this.bind();
    this.start();
    this.isLoading = false;
    this.isFinish = false;
    this.index = 0;
    this.$section = $('#top');

  },
  bind:function(){
    var _this = this;
    this.$section.on('scroll',function(){
    _this.start();
    });
  },
  start:function(){
    var _this=this;
    this.getData(function(data){
      _this.render(data);
    })
  },
  getData:function(callback){
    var _this=this;
    if(_this.isLoading){
      return 
    };
    _this.isLoading = true;
    _this.$section.find(".loading").show();
    $.ajax({
      url:'https://api.douban.com/v2/movie/top250',
      dataType:'jsonp',
      type:'GET',
      data:{
        start:_this.index
      }
    }).done(function(ret){
      _this.index += 20;
      if(_this.index >= ret.total){
        _this.isFinish = true;
      }
      callback&&callback(ret);
    }).fail(function(){
      console.log('数据异常')
    }).always(function(){
      _this.isLoading = false;
      _this.$section.find('.loading').hide()
    })
  },
  render:function(data){
    data.subjects.forEach(function(movie){
      var html= '<div class="item"><div class="imagebox"><img src="#" alt=""></div><div class="descript"><h2></h2><p class="type">1994/犯罪、剧情</p><p class="director">导演：弗兰克·德拉邦特</p><p class="actor">主演：蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</p></div></div>';
      var $node=$(html);
      $node.find('img').attr('src',movie.images.small);
      $node.find('.descript h2').text(movie.title);
      $node.find('.director').text('导演：'+movie.directors[0].name);
      function actors(){
       var actorsArr=[];
       movie.casts.forEach(function(item){
          actorsArr.push(item.name);
       })
       return actorsArr.join('、')
     }
      $node.find('.actor').text('主演：'+actors());
      $node.find('.descript .type').text(function(){
        var typeArr=[];
        movie.genres.forEach(function(item){
          typeArr.push(item);
        })
        return (movie.year+'/'+typeArr.join('、'))
      })
      $('section#top').append($node); 
    });
  }
};

var us = {
  init:function(){
  },
  bind:function(){
  },
  start:function(){
  }
}
var search = {
  init:function(){
  },
  bind:function(){
  },
  start:function(){
  }
}
var douban = {
  init:function(){
    this.$tabs = $('footer>div');
    this.$panels = $('section');
    this.bind();
    top.init();
    us.init();
    search.init();
  },
  bind:function(){
    var _this = this;
    this.$tabs.on('click',function(){
      $(this).addClass('active').siblings().removeClass('active');
      _this.panels.eq($(this).index()).fadeIn().siblings().hide();
    })
  }
};

douban.init();*/
