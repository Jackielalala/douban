getData()
var Index = 0;

function getData(){

  $.ajax({
    url:'https://api.douban.com/v2/movie/top250',
    type:'GET',
    data:{
    start:Index,
    count:20
    },
    dataType:'jsonp'
  }).done(function(ret){
    console.log(ret);
    render(ret);
    Index += 20;
    $('div.loading').attr('display','none');
  }).fail(function(){
    console.log('error...');
  });

  function render(data){
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
}

//$('footer > div').eq(0).on('click',function(){
//  $(this).addClass('active').siblings().removeClass('active');
//  $('section#top').addClass('active').siblings().removeClass('active');
//  getData();
//  $('#top').on('scroll',function(){
//    if($('.item').eq(Index-1).offset().top + $('.item').height()  <=  $(window).scrollTop() + $(window).height()){
//      getData();
//    }
//  })
//})

$('footer>div').on('click',function(){
  $(this).addClass('active').siblings().removeClass('active');
  var Index=$(this).index();
  $('section').eq(Index).addClass('active').siblings().removeClass('active');
})

//$('#top').on('scroll',function(){
//  if($('section').height+50===$(window).scrollTop()+$(window).height()){
//    getData();
//  }
//})






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
