$('footer div').on('click',function(){
  $(this).addClass('active').siblings().removeClass('active');
var index=$(this).index();
  $('section').siblings().hide().eq(index).fadeIn();
});


  $.ajax({
    url:'https://api.douban.com/v2/movie/top250',
    type:'GET',
    data:{
    start:0,
    count:20
  },/*在豆瓣api中可查*/
    dataType:'jsonp'
  }).done(function(ret){
     console.log(ret);
     getData(ret);
  }).fail(function(){
    console.log('error...');
  });
  function getData(data){
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
       $('section.top').append($node); 
     });
    }























